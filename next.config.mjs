/** @type {import('next').NextConfig} */
const nextConfig = {
  // 티스토리 이미지 허용
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.tistory.com" },
      { protocol: "https", hostname: "*.daumcdn.net" },
    ],
  },
  // iframe 에서 /animation/*.html 사용 허용
  async headers() {
    return [
      {
        source: "/animation/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
        ],
      },
    ];
  },
};

export default nextConfig;
