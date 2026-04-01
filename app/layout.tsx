import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/layout/Nav";

export const metadata: Metadata = {
  title: "bread & butter — dev blog",
  description:
    "plain bread is already enough. but a little butter makes it perfect.",
  openGraph: {
    title: "bread & butter",
    description: "개발, 프로젝트, 취미를 버터처럼 바르는 블로그",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <div className="site-wrapper">
          <Nav />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
