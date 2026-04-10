import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/layout/Nav";

export const metadata: Metadata = {
  title: "suyeon-dev.blog",
  description:
    "plain bread is already enough. but a little butter makes it perfect.",
  openGraph: {
    title: "suyeon.dev.blog",
    description: "나라는 빵 위에 버터와 잼을 발라요",
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
