import Link from "next/link";
import { getNotionPosts } from "@/lib/notion";
import { BreadIcon, LockIcon, LeafIcon } from "@/components/ui/CategoryIcons";

export default async function HomePage() {
  const posts = await getNotionPosts();
  const recent = posts.slice(0, 5);

  return (
    <div style={{ minHeight: "100vh" }}>

      {/* ── HERO TEXT ── */}
      <div className="fade-up fade-up-1 hero-text" style={{ textAlign: "center", padding: "12px 32px 0" }}>
        <p style={{ fontSize: "12px", letterSpacing: "0.2em", color: "var(--butter-accent)", textTransform: "uppercase", marginBottom: "8px" }}>
          the best moment ever with
        </p>
        <h1 className="hero-heading" style={{ fontSize: "clamp(48px, 12vw, 88px)", fontFamily: "var(--font-display)", fontWeight: 400, letterSpacing: "-2px", lineHeight: 1, marginBottom: "14px" }}>
          BREAD
        </h1>
        <p style={{ fontSize: "13px", color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase", lineHeight: 2 }}>
          plain bread is already enough
          <br />
          but a little butter makes it perfect
        </p>
      </div>

      {/* ── ANIMATION SLOT ── */}
      <div className="fade-up fade-up-2" style={{ width: "100%", margin: "8px 0" }}>
        <iframe
          src="/animation/hero.html"
          className="animation-slot"
          style={{ height: "420px" }}
          scrolling="no"
          title="bread animation"
        />
      </div>

      {/* ── QUICK NAV CARDS ── */}
      <div
        className="fade-up fade-up-3 home-cards"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", padding: "0 28px 24px", alignItems: "stretch" }}
      >
        {[
          { tag: "오늘의 빵", name: "기술", desc: "기술/공부/회고", href: "/blog",     icon: <BreadIcon size={16} /> },
          { tag: "버터",     name: "프로젝트",   desc: "프로젝트 모음",         href: "/projects", icon: <LockIcon  size={16} /> },
          { tag: "잼 & 토핑",       name: "취미 / 일상", desc: "영화, 책, 그리고 취미",  href: "/hobby",    icon: <LeafIcon  size={16} /> },
        ].map((c) => (
          <Link key={c.href} href={c.href} style={{ textDecoration: "none", display: "flex" }}>
            <div className="glass-card" style={{ padding: "20px", display: "flex", flexDirection: "column", width: "100%" }}>
              <div style={{ width: "30px", height: "30px", borderRadius: "8px", background: "var(--butter-dim)", border: "1px solid rgba(200,160,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
                {c.icon}
              </div>
              <div style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--butter-accent)", marginBottom: "6px" }}>
                {c.tag}
              </div>
              <div style={{ fontSize: "16px", fontWeight: 500, color: "var(--cream)", marginBottom: "6px" }}>
                {c.name}
              </div>
              <div style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.7, whiteSpace: "pre-line", flex: 1 }}>
                {c.desc}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="divider" style={{ marginBottom: "24px" }} />

      {/* ── RECENT POSTS ── */}
      <section className="recent-section" style={{ padding: "0 28px 20px" }}>
        <p style={{ fontSize: "12px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--butter-accent)", marginBottom: "14px" }}>
          최신 글
        </p>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {recent.length === 0 ? (
            <p style={{ fontSize: "14px", color: "var(--muted)" }}>
              노션을 연결하면 글이 표시됩니다.
            </p>
          ) : (
            recent.map((post, i) => (
              <Link
                key={i}
                href={`/blog/${post.id}`}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "14px 0", borderBottom: "0.5px solid rgba(255,255,255,0.1)", textDecoration: "none", transition: "opacity 0.2s" }}
                className="post-item-link"
              >
                <div>
                  <div style={{ fontSize: "15px", fontWeight: 400, color: "var(--cream)", marginBottom: "5px" }}>
                    {post.title}
                  </div>
                  <span className="butter-badge">{post.category || "글"}</span>
                </div>
                <span style={{ fontSize: "12px", color: "var(--muted)", marginLeft: "12px", flexShrink: 0 }}>
                  {post.pubDate?.slice(0, 10) ?? ""}
                </span>
              </Link>
            ))
          )}
        </div>

        <Link href="/blog" style={{ display: "block", textAlign: "center", fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--butter-accent)", marginTop: "20px", textDecoration: "none" }}>
          모든 글 보기 →
        </Link>
      </section>

      <div className="divider" style={{ marginBottom: "22px" }} />

      {/* ── FOOTER ── */}
      <footer className="site-footer" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", padding: "0 28px 32px" }}>
        <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.9, letterSpacing: "0.03em" }}>
          당신은 이미 충분한 사람입니다.
          <br />
          이 블로그가 그 위에 바르는
          <br />
          버터 한 조각이 되길 바랍니다.
        </p>
        <div className="site-footer-btns" style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-end" }}>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn-ghost">GitHub ↗</a>
          <a href="mailto:opop9817@gmail.com" className="btn-ghost">Email ↗</a>
        </div>
      </footer>

    </div>
  );
}
