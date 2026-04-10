import { getHobbyPosts } from "@/lib/notion";

const HOBBY_TABS = ["전체", "영화", "독서", "일상"];

export default async function HobbyPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat: catParam } = await searchParams;
  const cat = catParam ?? "전체";
  const posts = await getHobbyPosts();

  const filtered =
    cat === "전체"
      ? posts
      : posts.filter((p) => p.category === cat);

  return (
    <div style={{ padding: "32px 28px", maxWidth: "720px", margin: "0 auto" }}>
      <p style={{ fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--butter-accent)", marginBottom: "6px" }}>
        잼 & 토핑
      </p>
      <h2 style={{ fontSize: "36px", fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--cream)", letterSpacing: "-1px", marginBottom: "28px" }}>
        Hobby
      </h2>

      <div style={{ display: "flex", gap: "6px", marginBottom: "28px", flexWrap: "wrap" }}>
        {HOBBY_TABS.map((t) => (
          <a
            key={t}
            href={`/hobby?cat=${t}`}
            style={{
              fontSize: "12px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "6px 16px",
              borderRadius: "20px",
              border: "0.5px solid",
              textDecoration: "none",
              background:  t === cat ? "var(--butter)" : "transparent",
              color:       t === cat ? "#4a3a08"       : "var(--muted)",
              borderColor: t === cat ? "var(--butter)" : "rgba(255,255,255,0.18)",
            }}
          >
            {t}
          </a>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p style={{ fontSize: "14px", color: "var(--muted)" }}>
          노션에서 영화/독서/일상 카테고리 글을 올리면 여기에 표시됩니다.
        </p>
      ) : (
        <div className="hobby-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {filtered.map((post, i) => (
            <a
              key={i}
              href={`/blog/${post.id}`}
              className="glass-card"
              style={{ display: "block", padding: "18px", textDecoration: "none" }}
            >
              <span className="butter-badge" style={{ marginBottom: "10px", display: "inline-block" }}>
                {post.category}
              </span>
              <div style={{ fontSize: "15px", fontWeight: 500, color: "var(--cream)", marginBottom: "6px", lineHeight: 1.4 }}>
                {post.title}
              </div>
              <div style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.6 }}>
                {post.description}
              </div>
              <div style={{ fontSize: "12px", color: "var(--muted)", marginTop: "10px" }}>
                {post.pubDate}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
