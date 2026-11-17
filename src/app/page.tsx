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
    <main className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col items-center px-4 py-12">
      <Profile profile={profile} />
      <div className="mt-8 w-full">
        <LinkList links={links} />
      </div>
    </main>
  );
}
