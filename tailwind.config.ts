import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bread: {
          bg:      "#b8d4e4",  // 파우더 블루 배경
          cream:   "#e8e4c0",  // 크림 옐로 - 메인 텍스트
          butter:  "#f0dc78",  // 버터 옐로 - 포인트
          toast:   "#d4a96a",  // 황금빵 - 카드 포인트
          muted:   "#4a6a7a",  // 연한 블루 - 보조 텍스트
          dark:    "#5a8fa8",  // 진한 블루 - 그림자/강조
          plate:   "#e8e2d0",  // 접시 색
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body:    ["var(--font-body)"],
      },
      animation: {
        "float-slow":   "float 3.8s ease-in-out infinite",
        "float-mid":    "float 3.2s ease-in-out 0.5s infinite",
        "float-fast":   "float 4s ease-in-out 1s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
