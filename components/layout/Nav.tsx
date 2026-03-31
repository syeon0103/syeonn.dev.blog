"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/blog",      label: "blog" },
  { href: "/projects",  label: "projects" },
  { href: "/resume",    label: "resume" },
  { href: "/hobby",     label: "hobby" },
  { href: "/guestbook", label: "guestbook" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "18px 32px",
      }}
    >
      <Link
        href="/"
        style={{
          fontSize: "12px",
          fontWeight: 500,
          color: "var(--cream)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          textDecoration: "none",
        }}
      >
        bread &amp; butter
      </Link>

      <div style={{ display: "flex", gap: "24px" }}>
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`nav-link ${pathname.startsWith(l.href) ? "active" : ""}`}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
