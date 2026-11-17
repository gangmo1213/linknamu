"use client";

import { useEffect, useState } from "react";
import type { LinkItem } from "@/data/profile";
import LinkCard from "./LinkCard";

type Counts = Record<string, number>;

export default function LinkList({ links }: { links: LinkItem[] }) {
  // 서버에서 받은 값 (받기 전에는 비어 있어 모두 0회로 표시)
  const [fetched, setFetched] = useState<Counts>({});
  // 이 화면에서 직접 누른 횟수 — 서버 응답이 늦게 와도 덮어쓰이지 않도록 따로 보관
  const [local, setLocal] = useState<Counts>({});

  useEffect(() => {
    let cancelled = false;
    fetch("/api/clicks", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: { clicks: { linkId: string; count: number }[] }) => {
        if (cancelled) return;
        const next: Counts = {};
        for (const c of data.clicks) next[c.linkId] = c.count;
        setFetched(next);
      })
      .catch((err) => console.error("[clicks] 클릭 수를 불러오지 못했습니다", err));
    return () => {
      cancelled = true;
    };
  }, []);

  const handleClick = (id: string) => {
    setLocal((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  };

  return (
    <ul className="flex w-full flex-col gap-4">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard
            link={link}
            count={(fetched[link.id] ?? 0) + (local[link.id] ?? 0)}
            onClick={() => handleClick(link.id)}
          />
        </li>
      ))}
    </ul>
  );
}
