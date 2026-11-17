import Profile from "@/components/Profile";
import LinkList from "@/components/LinkList";
import { links, profile } from "@/data/profile";

/**
 * 메인 페이지 — wireframe.png 기준
 *  ┌──────────────┐
 *  │   (  사진  )  │  원형 프로필 사진
 *  │     이름      │
 *  │ [ 링크 카드 ] │  세로 배치
 *  │ [ 링크 카드 ] │
 *  │ [ 링크 카드 ] │
 *  └──────────────┘
 */
export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[440px] flex-col items-center px-6 pb-16 pt-16 sm:pt-24">
      <Profile profile={profile} />
      <div className="mt-10 w-full">
        <LinkList links={links} />
      </div>
    </main>
  );
}
