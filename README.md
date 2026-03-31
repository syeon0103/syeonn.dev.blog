# 🍞 bread & butter blog

> plain bread is already enough. but a little butter makes it perfect.

개발, 프로젝트, 취미를 버터처럼 바르는 개인 블로그입니다.  
티스토리 RSS와 연동되어 글을 자동으로 가져옵니다.

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | Next.js 15 (App Router) |
| 언어 | TypeScript |
| 스타일 | Tailwind CSS |
| 티스토리 연동 | fast-xml-parser + ISR |
| 방명록 DB | Supabase |
| 배포 | Vercel |

---

## 로컬 시작하기

```bash
# 1. 패키지 설치
npm install

# 2. 환경변수 설정
cp .env.local.example .env.local
# .env.local 파일을 열어서 값 채우기

# 3. 개발 서버 실행
npm run dev
# → http://localhost:3000
```

---

## 환경변수 설정 (.env.local)

```env
# 티스토리 RSS — 내 블로그 주소로 변경
TISTORY_RSS_URL=https://내블로그.tistory.com/rss

# Supabase — supabase.com 에서 프로젝트 생성 후 복붙
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
```

---

## 방명록 Supabase 테이블 생성

Supabase SQL Editor에서 아래 쿼리 실행:

```sql
create table guestbook (
  id         bigint generated always as identity primary key,
  name       text not null,
  message    text not null,
  created_at timestamptz default now()
);

-- 누구나 읽고 쓸 수 있도록 RLS 설정
alter table guestbook enable row level security;

create policy "anyone can read"
  on guestbook for select using (true);

create policy "anyone can insert"
  on guestbook for insert with check (true);
```

---

## 티스토리 카테고리 매핑

`lib/tistory.ts` 의 `CATEGORY_MAP` 에서  
티스토리 카테고리 이름 → 내 블로그 슬롯을 매핑합니다.

```ts
export const CATEGORY_MAP: Record<string, string> = {
  기술:          "tech",
  "프로젝트 회고": "retrospect",
  공부:          "study",
  영어:          "study",
  영화:          "hobby",   // → /hobby 에 표시
  독서:          "hobby",
  책:            "hobby",
  일상:          "hobby",
};
```

티스토리에서 사용하는 카테고리 이름과 정확히 일치해야 합니다.

---

## 애니메이션 슬롯 교체하기

메인 페이지 한가운데 있는 빵·버터 애니메이션 영역은  
`public/animation/hero.html` 파일입니다.

직접 만든 HTML 애니메이션으로 통째로 교체하면 됩니다.

높이 조정은 `app/page.tsx` 의 이 부분에서:

```tsx
<iframe
  src="/animation/hero.html"
  className="animation-slot"
  style={{ height: "420px" }}   {/* ← 이 값 조정 */}
  ...
/>
```

---

## 프로젝트/이력서 데이터 수정

- **프로젝트**: `data/projects.json`
- **이력서**: `data/resume.json`

JSON 파일을 직접 수정하면 됩니다. 빌드 없이 `git push` 하면 Vercel이 자동 배포합니다.

---

## GitHub → Vercel 배포

```bash
# 최초 1회
git init
git add .
git commit -m "init: bread & butter blog"
git remote add origin https://github.com/내아이디/bread-butter-blog.git
git push -u origin main

# 이후 업데이트
git add .
git commit -m "feat: 프로젝트 추가"
git push
```

Vercel에서 GitHub 레포를 연결하고  
환경변수를 Vercel 대시보드에서 동일하게 설정해주면 완료입니다.

---

## 페이지 구조

```
/              메인 홈 (소개 + 애니메이션 슬롯 + 최신 글 5건 + contact)
/blog          전체 블로그 글 목록 (기술 / 회고 / 공부 탭)
/projects      프로젝트 목록 (data/projects.json)
/resume        이력서 (data/resume.json)
/hobby         취미 글 목록 - 티스토리 영화/독서/일상 카테고리 연동
/guestbook     방명록 (Supabase)
```

---

## 글 올리는 방법

티스토리에 글을 올리면 → 최대 1시간 이내 자동 반영됩니다 (ISR).  
즉시 반영이 필요하면 Vercel 대시보드에서 **Redeploy** 하거나  
`next.config.mjs` 의 `revalidate` 값을 줄이면 됩니다.
