type IconProps = {
    size?: number;
};

/** 오늘의 빵 — 식빵 아이콘 (기술 블로그) */
export function BreadIcon({ size = 16 }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect x="2" y="4" width="12" height="9" rx="2" fill="#f0dc78" opacity="0.8" />
            <rect x="2" y="2" width="12" height="4" rx="2" fill="#d4a96a" opacity="0.9" />
            <line x1="4" y1="8" x2="12" y2="8" stroke="#b87840" strokeWidth="0.8" opacity="0.5" />
            <line x1="4" y1="10.5" x2="10" y2="10.5" stroke="#b87840" strokeWidth="0.8" opacity="0.4" />
        </svg>
    );
}

/** 버터 레시피 — 자물쇠 아이콘 (프로젝트) */
export function LockIcon({ size = 16 }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect x="2" y="5" width="12" height="8" rx="2" fill="#c8dde8" opacity="0.7" />
            <path d="M5 5V4a3 3 0 016 0v1" stroke="#a0bfce" strokeWidth="1" fill="none" />
            <circle cx="8" cy="9" r="1.5" fill="#7baec8" opacity="0.9" />
        </svg>
    );
}

/** 잼 & 토핑 — 잎사귀 아이콘 (취미) */
export function LeafIcon({ size = 16 }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M8 2C5.2 2 3 5 3 8s2.2 6 5 6 5-3 5-6-2.2-6-5-6z"
                fill="#a0cc98"
                opacity="0.7"
            />
            <path
                d="M6 7.5c0-1 .9-1.5 2-1.5s2 .5 2 1.5-.9 2-2 2-2-1-2-2z"
                fill="#7baa74"
                opacity="0.9"
            />
        </svg>
    );
}
