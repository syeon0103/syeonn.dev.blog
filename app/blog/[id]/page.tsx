import { getNotionPosts, getNotionPageMarkdown } from "@/lib/notion";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = await getNotionPosts();
  return posts.map((p) => ({ id: p.id }));
}

export default async function PostPage({
  params,
}: {
  params: { id: string };
}) {
  const [posts, markdown] = await Promise.all([
    getNotionPosts(),
    getNotionPageMarkdown(params.id),
  ]);

  const post = posts.find((p) => p.id === params.id);

  return (
    <div style={{ padding: "32px 28px", maxWidth: "720px", margin: "0 auto" }}>
      <Link
        href="/blog"
        style={{
          fontSize: "10px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--muted)",
          textDecoration: "none",
          display: "inline-block",
          marginBottom: "32px",
        }}
      >
        ← Blog
      </Link>

      {post && (
        <div style={{ marginBottom: "40px" }}>
          <span className="butter-badge" style={{ marginBottom: "12px", display: "inline-block" }}>
            {post.category}
          </span>
          <h1
            style={{
              fontSize: "28px",
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              color: "var(--cream)",
              letterSpacing: "-0.5px",
              marginBottom: "8px",
            }}
          >
            {post.title}
          </h1>
          <p style={{ fontSize: "10px", color: "var(--muted)" }}>{post.pubDate}</p>
        </div>
      )}

      <div className="notion-body">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
}
