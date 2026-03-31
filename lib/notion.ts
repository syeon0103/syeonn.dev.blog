import { Client } from "@notionhq/client";

// ── 설정 ─────────────────────────────────────────────────────────
// .env.local 에 NOTION_TOKEN, NOTION_DATABASE_ID 추가 필요
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const DATABASE_ID = process.env.NOTION_DATABASE_ID ?? "";

// 노션 카테고리 → 블로그 라우트 매핑 (필요 시 수정)
export const CATEGORY_MAP: Record<string, string> = {
  기술: "log",
  "프로젝트 회고": "retrospect",
  공부: "study",
  일상: "hobby",
};

export interface NotionPost {
  title: string;
  link: string;
  pubDate: string;
  category: string;
  description: string;
}

// ── 데이터 가져오기 ──────────────────────────────────────────────

/**
 * 노션 데이터베이스에서 Published 상태인 페이지들을 가져옵니다.
 */
export async function getNotionPosts(): Promise<NotionPost[]> {
  if (!DATABASE_ID) {
    console.error("NOTION_DATABASE_ID is missing");
    return [];
  }

  try {
    const response = await (notion.databases as any).query({
      database_id: DATABASE_ID,
      filter: {
        property: "Status",
        status: {
          equals: "Published",
        },
      },
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
    });

    return (response.results as any[]).map((page: any) => {
      const props = page.properties;

      // 제목 추출
      const title = props.Name?.title[0]?.plain_text ?? "제목 없음";

      // 날짜 추출
      const pubDate = props.Date?.date?.start ?? "";

      // 카테고리 추출
      const category = props.Category?.select?.name ?? "";

      // 요약 추출
      const description = props.Summary?.rich_text[0]?.plain_text ?? "";

      // 링크 추출 (URL 속성이 있으면 사용, 없으면 노션 페이지 URL 사용)
      const link = props.URL?.url ?? page.url;

      return {
        title,
        link,
        pubDate,
        category,
        description,
      };
    });
  } catch (error) {
    console.error("Error fetching Notion posts:", error);
    return [];
  }
}

/** 특정 카테고리 필터링 */
export async function getNotionPostsByCategory(
  category: string
): Promise<NotionPost[]> {
  const all = await getNotionPosts();

  return all.filter((p) => {
    const mapped = CATEGORY_MAP[p.category];
    return p.category === category || mapped === category;
  });
}

/** 취미 관련 글 */
export async function getHobbyPosts(): Promise<NotionPost[]> {
  return getNotionPostsByCategory("hobby");
}

/** 기술/회고/공부 글 (블로그 페이지용) */
export async function getBlogPosts(): Promise<NotionPost[]> {
  const all = await getNotionPosts();
  // 'hobby'로 매핑되지 않는 모든 글을 블로그 글로 간주
  return all.filter(
    (p) => !["hobby"].includes(CATEGORY_MAP[p.category] ?? "")
  );
}
