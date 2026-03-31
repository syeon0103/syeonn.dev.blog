import { getBlogPosts } from "@/lib/notion";

const TABS = ["전체", "기술", "프로젝트 회고", "공부"];

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { cat?: string };
}) {
  const cat   = searchParams.cat ?? "전체";
  const posts = await getBlogPosts();

  const filtered =
    cat === "전체"
      ? posts
      : posts.filter((p) => p.category === cat);

  return (
      <div style={{padding: "32px 28px", maxWidth: "720px", margin: "0 auto"}}>

          {/* 헤더 */}
          <p style={{
              fontSize: "9px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: "6px"
          }}>
              오늘의 빵
          </p>
          <h2 style={{
              fontSize: "36px",
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              color: "var(--cream)",
              letterSpacing: "-1px",
              marginBottom: "28px"
          }}>
              Blog
          </h2>

          {/* 카테고리 탭 */}
          <div style={{display: "flex", gap: "6px", marginBottom: "28px", flexWrap: "wrap"}}>
              {TABS.map((t) => (
                  <a
                      key={t}
                      href={`/blog?cat=${t}`}
                      style={{
                          fontSize: "10px",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          padding: "5px 14px",
                          borderRadius: "20px",
                          border: "0.5px solid",
                          textDecoration: "none",
                          background: t === cat ? "var(--butter)" : "transparent",
                          color: t === cat ? "#4a3a08" : "var(--muted)",
                          borderColor: t === cat ? "var(--butter)" : "rgba(255,255,255,0.18)",
                          transition: "all 0.2s",
                      }}
                  >
                      {t}
                  </a>
              ))}
          </div>

          {/* 글 목록 */}
          {filtered.length === 0 ? (
              <p style={{fontSize: "12px", color: "var(--muted)"}}>
                  글이 없습니다. 노션을 연결해 주세요.
              </p>
          ) : (
              <div style={{display: "flex", flexDirection: "column"}}>
                  {filtered.map((post, i) => (
                      <a
                          key={i}
                          href={post.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                              display: "block",
                              padding: "18px 0",
                              borderBottom: "0.5px solid rgba(255,255,255,0.1)",
                              textDecoration: "none",
                              transition: "opacity 0.2s",
                          }}
                      >
                          <div style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                              gap: "12px"
                          }}>
                              <div style={{flex: 1}}>
                                  <div style={{
                                      fontSize: "14px",
                                      fontWeight: 500,
                                      color: "var(--cream)",
                                      marginBottom: "6px"
                                  }}>
                                      {post.title}
                                  </div>
                                  <div style={{
                                      fontSize: "11px",
                                      color: "var(--muted)",
                                      lineHeight: 1.6,
                                      marginBottom: "8px"
                                  }}>
                                      {post.description}…
                                  </div>
                                  <span className="butter-badge">{post.category || "글"}</span>
                              </div>
                              <span style={{fontSize: "10px", color: "var(--muted)", flexShrink: 0}}>
                  {post.pubDate}
                </span>
                          </div>
                      </a>
                  ))}
              </div>
          )}
      </div>
  );
}
