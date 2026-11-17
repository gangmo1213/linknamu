"use client";

import { useState } from "react";
import type { Profile as ProfileData } from "@/data/profile";

function initials(name: string) {
  return name.trim().slice(0, 1).toUpperCase();
}

export default function Profile({ profile }: { profile: ProfileData }) {
  const [failed, setFailed] = useState(false);

  return (
    <header className="flex flex-col items-center gap-3">
      {failed || !profile.image ? (
        <div
          role="img"
          aria-label={`${profile.name} 프로필`}
          className="flex h-40 w-40 items-center justify-center rounded-full bg-emerald-600 text-5xl font-bold text-white"
        >
          {initials(profile.name)}
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={profile.image}
          alt={`${profile.name} 프로필 사진`}
          width={160}
          height={160}
          onError={() => setFailed(true)}
          className="h-40 w-40 rounded-full object-cover"
        />
      )}
      <h1 className="text-2xl font-bold">{profile.name}</h1>
    </header>
  );
}
