import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

const DATABASE_ID = process.env.NOTION_DATABASE_ID ?? "";

export interface NotionPost {
  id: string;
  title: string;
  pubDate: string;
  category: string;
  description: string;
}

export async function getNotionPosts(): Promise<NotionPost[]> {
  if (!DATABASE_ID) {
    console.error("NOTION_DATABASE_ID is missing");
    return [];
  }

  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: "Status",
        status: {
          equals: "발행",
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
      const titleProp = Object.values(props).find((p: any) => p.type === "title") as any;
      const title = titleProp?.title[0]?.plain_text ?? "제목 없음";
      const pubDate = props.Date?.date?.start ?? "";
      const category = props.Category?.select?.name ?? "";
      const description = props.Summary?.rich_text[0]?.plain_text ?? "";

      return { id: page.id, title, pubDate, category, description };
    });
  } catch (error) {
    console.error("Error fetching Notion posts:", error);
    return [];
  }
}

export async function getNotionPageMarkdown(pageId: string): Promise<string> {
  const mdBlocks = await n2m.pageToMarkdown(pageId);
  return n2m.toMarkdownString(mdBlocks).parent;
}

const HOBBY_CATEGORIES = ["영화", "독서", "일상"];

export async function getHobbyPosts(): Promise<NotionPost[]> {
  const all = await getNotionPosts();
  return all.filter((p) => HOBBY_CATEGORIES.includes(p.category));
}

export async function getBlogPosts(): Promise<NotionPost[]> {
  const all = await getNotionPosts();
  return all.filter((p) => !HOBBY_CATEGORIES.includes(p.category));
}
