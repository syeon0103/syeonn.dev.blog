"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Entry {
  id: number;
  name: string;
  message: string;
  created_at: string;
}

export default function GuestbookPage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [name,    setName]    = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchEntries(); }, []);

  async function fetchEntries() {
    const { data } = await supabase
      .from("guestbook")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setEntries(data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setLoading(true);
    await supabase.from("guestbook").insert({ name, message });
    setName(""); setMessage("");
    await fetchEntries();
    setLoading(false);
  }

  return (
    <div style={{ padding: "32px 28px", maxWidth: "600px", margin: "0 auto" }}>
      <p style={{ fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "6px" }}>
        빵집 방문록
      </p>
      <h2 style={{ fontSize: "36px", fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--cream)", letterSpacing: "-1px", marginBottom: "28px" }}>
        Guestbook
      </h2>

      {/* 작성 폼 */}
      <form onSubmit={handleSubmit} className="glass-card" style={{ padding: "20px", marginBottom: "28px" }}>
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={20}
          style={{
            width: "100%",
            background: "rgba(255,255,255,0.08)",
            border: "0.5px solid rgba(255,255,255,0.2)",
            borderRadius: "8px",
            padding: "10px 14px",
            color: "var(--cream)",
            fontSize: "13px",
            marginBottom: "10px",
            outline: "none",
          }}
        />
        <textarea
          placeholder="방명록을 남겨주세요 :)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={200}
          rows={3}
          style={{
            width: "100%",
            background: "rgba(255,255,255,0.08)",
            border: "0.5px solid rgba(255,255,255,0.2)",
            borderRadius: "8px",
            padding: "10px 14px",
            color: "var(--cream)",
            fontSize: "13px",
            marginBottom: "12px",
            outline: "none",
            resize: "vertical",
            fontFamily: "var(--font-body)",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          className="btn-ghost"
          style={{ background: "var(--butter)", color: "#4a3a08", borderColor: "var(--butter)" }}
        >
          {loading ? "저장 중…" : "남기기 →"}
        </button>
      </form>

      {/* 방명록 목록 */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {entries.map((e) => (
          <div key={e.id} className="glass-card" style={{ padding: "16px 18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--cream)" }}>{e.name}</span>
              <span style={{ fontSize: "10px", color: "var(--muted)" }}>
                {new Date(e.created_at).toLocaleDateString("ko-KR")}
              </span>
            </div>
            <p style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.7 }}>{e.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
