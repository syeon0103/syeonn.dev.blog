import Link from "next/link";
import { getNotionPosts } from "@/lib/notion";
import { BreadIcon, LockIcon, LeafIcon } from "@/components/ui/CategoryIcons";

export default async function HomePage() {
  // 최신 5건 (전체 카테고리)
  const posts = await getNotionPosts();
  const recent = posts.slice(0, 5);

  return (
    <div style={{ minHeight: "100vh" }}>

      {/* ── HERO TEXT ── */}
      <div
        className="fade-up fade-up-1"
        style={{ textAlign: "center", padding: "12px 32px 0" }}
      >
        <p
          style={{
            fontSize: "9px",
            letterSpacing: "0.25em",
            color: "var(--muted)",
            textTransform: "uppercase",
            marginBottom: "8px",
          }}
        >
          the best moment ever with
        </p>
        <h1
          style={{
            fontSize: "clamp(56px, 12vw, 88px)",
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            color: "var(--cream)",
            letterSpacing: "-2px",
            lineHeight: 1,
            marginBottom: "14px",
          }}
        >
          BREAD
        </h1>
        <p
          style={{
            fontSize: "10px",
            color: "var(--muted)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            lineHeight: 2,
          }}
        >
          plain bread is already enough
          <br />
          but a little butter makes it perfect
        </p>
      </div>

      {/* ── ANIMATION SLOT ──────────────────────────────────────────
          나중에 직접 만든 애니메이션 HTML 파일을 이곳에 넣으세요.
          public/animation/hero.html 로 파일을 두고
          height 값을 원하는 대로 조정하면 됩니다.
      ──────────────────────────────────────────────────────────── */}
      <div
        className="fade-up fade-up-2"
        style={{ width: "100%", margin: "8px 0" }}
      >
        <iframe
          src="/animation/hero.html"
          className="animation-slot"
          style={{ height: "420px" }}        /* ← 높이 자유 조정 */
          scrolling="no"
          title="bread animation"
        />
      </div>
      {/* ── ANIMATION SLOT END ── */}

      {/* ── QUICK NAV CARDS ── */}
        <div
            className="fade-up fade-up-3"
            style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "10px",
                padding: "0 28px 24px",
            }}
        >



            {[
                {tag: "오늘의 빵", name: "기술 블로그", desc: "매일 새로 구운 글들.\n기술, 회고, 공부 기록.", href: "/blog", iconBg: "rgba(240,220,120,0.25)", icon: <BreadIcon size={16} />},
                {tag: "버터 레시피", name: "프로젝트", desc: "기술로 빚어낸 결과물들.", href: "/projects",iconBg: "rgba(240,220,120,0.25)",  icon: <LockIcon  size={16} />},
                {tag: "잼 & 토핑", name: "취미 / 일상", desc: "영화, 책, 그리고 소소한 것들.", href: "/hobby", iconBg: "rgba(240,220,120,0.25)",icon: <LeafIcon  size={16} />},
            ].map((c) => (

                <Link key={c.href} href={c.href} style={{textDecoration: "none"}}>


                    <div className="glass-card" style={{padding: "16px"}}>
                        <div
                            style={{
                                width: "28px",
                                height: "28px",
                                borderRadius: "8px",
                                background: c.iconBg,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginBottom: "8px",
                            }}
                        >
                            {c.icon}
                        </div>
                        <div
                            style={{
                                fontSize: "9px",
                                letterSpacing: "0.18em",
                                textTransform: "uppercase",
                                color: "var(--muted)",
                                marginBottom: "5px",
                            }}
                        >
                            {c.tag}
                        </div>
                        <div
                            style={{
                                fontSize: "13px",
                                fontWeight: 500,
                                color: "var(--cream)",
                                marginBottom: "4px",
                            }}
                        >
                            {c.name}
                        </div>
                        <div
                            style={{
                                fontSize: "10px",
                                color: "var(--muted)",
                                lineHeight: 1.6,
                                whiteSpace: "pre-line",
                            }}
                        >
                            {c.desc}
                        </div>
                    </div>
                </Link>
            ))}
        </div>

        <div className="divider" style={{marginBottom: "24px"}}/>

        {/* ── RECENT POSTS ── */}
        <section style={{padding: "0 28px 20px"}}>
            <p
                style={{
                    fontSize: "9px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginBottom: "14px",
                }}
            >
                최신 글
            </p>

            <div style={{display: "flex", flexDirection: "column", gap: "0"}}>
                {recent.length === 0 ? (
                    <p style={{fontSize: "12px", color: "var(--muted)"}}>
                        노션을 연결하면 글이 표시됩니다.
                    </p>
                ) : (
                    recent.map((post: any, i: number) => (
                        <a
                key={i}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  padding: "13px 0",
                  borderBottom: "0.5px solid rgba(255,255,255,0.1)",
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
                className="post-item-link"
                        >
                <div>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 400,
                      color: "var(--cream)",
                      marginBottom: "4px",
                    }}
                  >
                    {post.title}
                  </div>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <span className="butter-badge">{post.category || "글"}</span>
                    <span style={{ fontSize: "10px", color: "var(--muted)" }}>
                      Notion
                    </span>
                  </div>
                </div>
                <span
                  style={{
                    fontSize: "10px",
                    color: "var(--muted)",
                    marginLeft: "12px",
                    flexShrink: 0,
                  }}
                >
                  {post.pubDate?.slice(0, 10) ?? ""}
                </span>
              </a>
            ))
          )}
        </div>

        <Link
          href="/blog"
          style={{
            display: "block",
            textAlign: "center",
            fontSize: "10px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--butter)",
            marginTop: "18px",
            textDecoration: "none",
          }}
        >
          모든 글 보기 →
        </Link>
      </section>

      <div className="divider" style={{ marginBottom: "22px" }} />

      {/* ── FOOTER / CONTACT ── */}
      <footer
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          padding: "0 28px 32px",
        }}
      >
        <p
          style={{
            fontSize: "10px",
            color: "var(--muted)",
            lineHeight: 1.9,
            letterSpacing: "0.03em",
          }}
        >
          당신은 이미 충분한 사람입니다.
          <br />
          이 블로그가 그 위에 바르는
          <br />
          버터 한 조각이 되길 바랍니다.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-end" }}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            GitHub ↗
          </a>
          <a href="mailto:your@email.com" className="btn-ghost">
            Email ↗
          </a>
        </div>
      </footer>

    </div>
  );
}
