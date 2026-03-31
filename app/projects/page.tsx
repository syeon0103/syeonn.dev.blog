import projects from "@/data/projects.json";

export default function ProjectsPage() {
  return (
    <div style={{ padding: "32px 28px", maxWidth: "720px", margin: "0 auto" }}>
      <p style={{ fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "6px" }}>
        버터 레시피
      </p>
      <h2 style={{ fontSize: "36px", fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--cream)", letterSpacing: "-1px", marginBottom: "32px" }}>
        Projects
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {projects.map((p) => (
          <div key={p.id} className="glass-card" style={{ padding: "20px 22px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
              <div>
                <span className="butter-badge" style={{ marginRight: "8px" }}>{p.category}</span>
                <span style={{ fontSize: "10px", color: p.status === "운영 중" ? "var(--butter)" : "var(--muted)" }}>
                  {p.status}
                </span>
              </div>
              <span style={{ fontSize: "10px", color: "var(--muted)" }}>{p.period}</span>
            </div>

            <h3 style={{ fontSize: "17px", fontWeight: 500, color: "var(--cream)", marginBottom: "3px" }}>
              {p.title}
            </h3>
            <p style={{ fontSize: "11px", color: "var(--muted)", marginBottom: "10px" }}>
              {p.subtitle}
            </p>
            <p style={{ fontSize: "12px", color: "var(--cream)", opacity: 0.75, lineHeight: 1.7, marginBottom: "14px" }}>
              {p.description}
            </p>

            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "14px" }}>
              {p.tags.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.1em",
                    padding: "3px 9px",
                    borderRadius: "20px",
                    border: "0.5px solid rgba(255,255,255,0.2)",
                    color: "var(--muted)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              {p.github && (
                <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ fontSize: "10px" }}>
                  GitHub ↗
                </a>
              )}
              {p.demo && (
                <a href={p.demo} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ fontSize: "10px" }}>
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
