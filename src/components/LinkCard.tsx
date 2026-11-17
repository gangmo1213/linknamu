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
    return <img src={icon} alt="" width={24} height={24} className="h-6 w-6" />;
  }
  return (
    <span aria-hidden="true" className="text-xl leading-none">
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
      className="flex min-h-[44px] items-center gap-3 rounded-xl border-2 border-foreground/80 px-4 py-3 transition hover:-translate-y-0.5 hover:bg-foreground/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
    >
      {link.icon && <Icon icon={link.icon} />}
      <span className="flex flex-1 flex-col text-center">
        <span className="font-semibold">{link.title}</span>
        {link.description && (
          <span className="text-sm text-foreground/70">{link.description}</span>
        )}
      </span>
      {link.icon && <span aria-hidden="true" className="w-6" />}
    </a>
  );
}
