import projects from "@/data/projects.json";

const STATUS_CLASS: Record<string, string> = {
  "운영 중": "live",
  "진행 중": "wip",
  "기획 중": "plan",
  "완료":    "done",
  "보류":    "hold",
};

export default function ProjectsPage() {
  return (
    <div style={{ padding: "32px 28px", maxWidth: "720px", margin: "0 auto" }}>
      <p style={{ fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--butter-accent)", marginBottom: "6px" }}>
        버터 레시피
      </p>
      <h2 style={{ fontSize: "36px", fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--cream)", letterSpacing: "-1px", marginBottom: "32px" }}>
        Projects
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {projects.map((p) => (
          <div key={p.id} className="glass-card" style={{ padding: "22px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <span className="butter-badge">{p.category}</span>
                <span className={`status-chip ${STATUS_CLASS[p.status] ?? "done"}`}>{p.status}</span>
              </div>
              <span style={{ fontSize: "12px", color: "var(--muted)" }}>{p.period}</span>
            </div>

            <h3 style={{ fontSize: "18px", fontWeight: 500, color: "var(--cream)", marginBottom: "4px" }}>
              {p.title}
            </h3>
            <p style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "12px" }}>
              {p.subtitle}
            </p>
            <p style={{ fontSize: "14px", color: "var(--cream)", opacity: 0.8, lineHeight: 1.7, marginBottom: "16px" }}>
              {p.description}
            </p>

            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "16px" }}>
              {p.tags.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.06em",
                    padding: "3px 10px",
                    borderRadius: "20px",
                    border: "1px solid rgba(28,50,68,0.30)",
                    background: "rgba(28,50,68,0.08)",
                    color: "var(--cream)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              {p.github && (
                <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  GitHub ↗
                </a>
              )}
              {p.demo && (
                <a href={p.demo} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  Demo ↗
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
