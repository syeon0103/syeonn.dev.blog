"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const links = [
  { href: "/blog",     label: "blog" },
  { href: "/projects", label: "projects" },
  { href: "/resume",   label: "resume" },
  { href: "/hobby",    label: "hobby" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // 페이지 이동 시 메뉴 닫기
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <nav className="nav-bar">
        <Link href="/" className="nav-logo">
          bread &amp; butter
        </Link>

        {/* 데스크탑 링크 */}
        <div className="nav-links">
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

        {/* 모바일 햄버거 */}
        <button
          className="nav-hamburger"
          onClick={() => setOpen((v) => !v)}
          aria-label="메뉴"
        >
          <span className={`ham-line ${open ? "open" : ""}`} />
          <span className={`ham-line ${open ? "open" : ""}`} />
          <span className={`ham-line ${open ? "open" : ""}`} />
        </button>
      </nav>

      {/* 모바일 드롭다운 */}
      {open && (
        <div className="mobile-menu">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`mobile-menu-link ${pathname.startsWith(l.href) ? "active" : ""}`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
