import resume from "@/data/resume.json";

export default function ResumePage() {
  return (
    <div style={{ padding: "32px 28px", maxWidth: "680px", margin: "0 auto" }}>
      <p style={{ fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "6px" }}>
        제빵사 소개
      </p>
      <h2 style={{ fontSize: "36px", fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--cream)", letterSpacing: "-1px", marginBottom: "6px" }}>
        {resume.name}
      </h2>
      <p style={{ fontSize: "12px", color: "var(--butter)", marginBottom: "8px", letterSpacing: "0.05em" }}>
        {resume.role}
      </p>
      <p style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.8, marginBottom: "32px" }}>
        {resume.intro}
      </p>

      <Section label="기술 스택">
        {Object.entries(resume.skills).map(([area, list]) => (
          <div key={area} style={{ marginBottom: "12px" }}>
            <p style={{ fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "6px" }}>
              {area}
            </p>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {list.map((s) => (
                <span
                  key={s}
                  style={{
                    fontSize: "11px",
                    padding: "4px 11px",
                    borderRadius: "20px",
                    border: "0.5px solid rgba(255,255,255,0.2)",
                    color: "var(--cream)",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </Section>

      <Section label="경력">
        {resume.experience.map((e, i) => (
          <div key={i} className="glass-card" style={{ padding: "16px", marginBottom: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--cream)" }}>{e.company}</span>
              <span style={{ fontSize: "10px", color: "var(--muted)" }}>{e.period}</span>
            </div>
            <p style={{ fontSize: "11px", color: "var(--butter)", marginBottom: "8px" }}>{e.role}</p>
            <ul style={{ paddingLeft: "14px" }}>
              {e.desc.map((d, j) => (
                <li key={j} style={{ fontSize: "11px", color: "var(--muted)", lineHeight: 1.8 }}>{d}</li>
              ))}
            </ul>
          </div>
        ))}
      </Section>

      <Section label="학력">
        {resume.education.map((e, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "0.5px solid rgba(255,255,255,0.1)" }}>
            <div>
              <span style={{ fontSize: "13px", color: "var(--cream)" }}>{e.school}</span>
              <span style={{ fontSize: "11px", color: "var(--muted)", marginLeft: "10px" }}>{e.major}</span>
            </div>
            <span style={{ fontSize: "10px", color: "var(--muted)" }}>{e.period}</span>
          </div>
        ))}
      </Section>

      <Section label="자격증">
        {resume.certifications.map((c, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "0.5px solid rgba(255,255,255,0.1)" }}>
            <span style={{ fontSize: "13px", color: "var(--cream)" }}>{c.name}</span>
            <span style={{ fontSize: "10px", color: "var(--muted)" }}>{c.date}</span>
          </div>
        ))}
      </Section>

      <Section label="연락처">
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <a href={`mailto:${resume.contact.email}`} style={{ fontSize: "12px", color: "var(--butter)", textDecoration: "none" }}>
            {resume.contact.email}
          </a>
          <a href={resume.contact.github} target="_blank" rel="noopener noreferrer" style={{ fontSize: "12px", color: "var(--muted)", textDecoration: "none" }}>
            {resume.contact.github}
          </a>
          <a href={resume.contact.tistory} target="_blank" rel="noopener noreferrer" style={{ fontSize: "12px", color: "var(--muted)", textDecoration: "none" }}>
            {resume.contact.tistory}
          </a>
        </div>
      </Section>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: "32px" }}>
      <p style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "14px" }}>
        {label}
      </p>
      {children}
    </section>
  );
}
