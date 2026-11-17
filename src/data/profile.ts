export type LinkItem = {
  /** 고유 ID (클릭 집계 키) */
  id: string;
  title: string;
  url: string;
  /** 이모지 또는 이미지 경로 (/icons/x.svg) */
  icon?: string;
  description?: string;
};

export type Profile = {
  name: string;
  /** public/ 기준 경로 또는 외부 URL */
  image: string;
};

// TODO: 아래는 보여주기용 더미값입니다. 실제 내용으로 교체하세요.
export const profile: Profile = {
  name: "구경모",
  image: "/profile.png",
};

export const links: LinkItem[] = [
  {
    id: "instagram",
    title: "인스타그램",
    url: "https://www.instagram.com/ninegangmo/",
    icon: "/icons/instagram.svg",
    description: "일상 사진",
  },
  {
    id: "naver-blog",
    title: "네이버 블로그",
    url: "https://blog.naver.com/k_k__m_o",
    icon: "/icons/naver-blog.svg",
    description: "기록과 이야기",
  },
  {
    id: "youtube",
    title: "유튜브",
    url: "https://www.youtube.com/@%EA%B5%AC%EA%B2%BD%EB%AA%A8-i8y",
    icon: "/icons/youtube.svg",
    description: "영상 모음",
  },
];

export const linkIds = new Set(links.map((l) => l.id));
