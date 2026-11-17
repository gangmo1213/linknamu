"use client";

import { useState } from "react";
import type { Profile as ProfileData } from "@/data/profile";

function initials(name: string) {
  return name.trim().slice(0, 1).toUpperCase();
}

export default function Profile({ profile }: { profile: ProfileData }) {
  const [failed, setFailed] = useState(false);

  return (
    <header className="flex flex-col items-center gap-5">
      {/* 바깥 링 + 이중 그림자로 살짝 떠 있는 입체감 */}
      <div className="rounded-full bg-white/70 p-1.5 shadow-[0_2px_4px_rgba(60,45,30,0.06),0_18px_40px_-14px_rgba(60,45,30,0.35)] ring-1 ring-white/80 backdrop-blur">
        {failed || !profile.image ? (
          <div
            role="img"
            aria-label={`${profile.name} 프로필`}
            className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-[#f3e7d8] to-[#dbe6f3] text-4xl font-bold text-foreground/80"
          >
            {initials(profile.name)}
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.image}
            alt={`${profile.name} 프로필 사진`}
            width={112}
            height={112}
            onError={() => setFailed(true)}
            className="h-28 w-28 rounded-full bg-gradient-to-br from-[#f7efe5] to-[#e3ebf5] object-cover object-center shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]"
          />
        )}
      </div>
      <h1 className="text-[22px] font-bold tracking-[-0.02em]">{profile.name}</h1>
    </header>
  );
}
