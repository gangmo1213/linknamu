"use client";

import type { LinkItem } from "@/data/profile";

function trackClick(id: string) {
  try {
    const body = JSON.stringify({ linkId: id });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/clicks", new Blob([body], { type: "application/json" }));
    } else {
      fetch("/api/clicks", {
        method: "POST",
        body,
        headers: { "Content-Type": "application/json" },
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // 집계 실패가 이동을 막지 않도록 무시
  }
}

function Icon({ icon }: { icon: string }) {
  if (icon.startsWith("/") || icon.startsWith("http")) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={icon} alt="" width={28} height={28} className="h-7 w-7 shrink-0" />;
  }
  return (
    <span aria-hidden="true" className="w-7 shrink-0 text-center text-xl leading-none">
      {icon}
    </span>
  );
}

export default function LinkCard({ link }: { link: LinkItem }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackClick(link.id)}
      className="flex min-h-[64px] items-center gap-4 rounded-[20px] border border-white/70 bg-white/45 px-5 py-4 shadow-[0_1px_2px_rgba(60,45,30,0.04),0_10px_30px_-16px_rgba(60,45,30,0.25)] backdrop-blur-xl transition duration-300 ease-out hover:border-white/90 hover:bg-white/65 hover:shadow-[0_1px_2px_rgba(60,45,30,0.05),0_14px_34px_-16px_rgba(60,45,30,0.32)] motion-safe:hover:-translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/40"
    >
      {link.icon && <Icon icon={link.icon} />}
      <span className="flex flex-1 flex-col gap-0.5 text-center">
        <span className="text-[15px] font-semibold tracking-[-0.01em]">{link.title}</span>
        {link.description && (
          <span className="text-[13px] text-foreground/55">{link.description}</span>
        )}
      </span>
      {link.icon && <span aria-hidden="true" className="w-7 shrink-0" />}
    </a>
  );
}
