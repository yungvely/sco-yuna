# 💌 Mobile Wedding Invitation (SCO ❤️ YUNA)

> 모바일 환경에 최적화된 청첩장 웹앱  
> 🕊️ 특별한 날을 위한 특별한 코드, 누구보다 정성스럽게 만든 모바일 청첩장입니다.  
> Next.js 기반, RSVP 제출, CloudFront 로그 분석, 카카오 공유 등 다양한 기능 포함.

## ✨ 주요 기능

### ✅ 1. RSVP 응답 및 통계

- 참석 여부 / 인원 수 / 메시지 입력
- 관리자 페이지에서 실시간 통계 확인 (Pie, Bar 차트)
- 양측(신랑/신부) RSVP 분리 표시 및 히스토리 제공

### ✅ 2. 커스텀 카카오 공유

- 받는 사람 이름을 지정하여 개별 [링크 공유](https://sco-yuna.kr/yuna?name=윤아&via=kakao) 가능
- 초대장 진입 전 `Redirecting` 페이지를 통해 **원하지 않는 공유 방지**
- 페이지 주소 강제 리셋 → `/?name=...&auth=true → /`로 replace 처리

  #### 🔐 공유 제한 설계

  - **공유 주소 직접 접근 차단**
  - `via=kakao` 쿼리 파라미터가 없으면 `/`로 리다이렉트
  - 주소창에 `/?name=...`이 남지 않도록 `replaceState`로 URL 정리
  - 개별 초대 링크를 통해서만 제대로 된 초대장 뷰 확인 가능

### ✅ 3. 📦 이미지 최적화 및 S3 업로드 구조

- WebP 변환 및 S3 업로드 자동화 스크립트
- 변경 파일만 업로드, 삭제 감지 및 CloudFront 무효화까지 자동 처리
- `yarn upload:img` 한 줄로 전체 배포 가능

| 파일                               | 기능                                                    |
| ---------------------------------- | ------------------------------------------------------- |
| `scripts/optimizeImages.ts`        | public/photo 하위 이미지 WebP 변환 (Magick) + 해시 관리 |
| `scripts/uploadPhotosToS3.ts`      | 변경된 이미지만 S3에 업로드, CloudFront 무효화 포함     |
| `scripts/analyzeCloudfrontLogs.ts` | 하루 단위 CloudFront 로그 분석 및 hit/miss 계산         |

---

## 📁 프로젝트 구조

```plaintext

public/photo                   # 최적화 대상 원본 이미지

scripts/                       # 이미지 최적화 및 CloudFront 로그 처리
├── analyzeCloudfrontLogs.ts   # CDN 로그 분석 및 Firebase 저장
├── optimizeImages.ts          # WebP 변환 및 해시 기록
└── uploadPhotosToS3.ts        # S3 업로드 + CloudFront 무효화

src/
├── components/                # UI 컴포넌트
│   ├── Admin/                 # 관리자 페이지 구성
│   ├── Header/                # Hero, Canvas, Wave 등 헤더 섹션
│   ├── Invitation/            # 청첩장 각 섹션
│   ├── RSVP/                  # RSVP 폼 및 팝업
│   └── common/                # 공용 UI
├── lib/                       # Firebase 및 유틸
├── pages/                     # Next.js 라우팅 페이지
├── store/                     # 상태 관리 (Zustand)
└── styles/                    # 스타일 정의 (styled-components)
└── type/                      # 타입 정의


docs/                          # docs md위치
```

---

## 🔧 개발 스크립트

```bash
# 개발 서버 실행
yarn dev

# 정적 최적화 (이미지 → WebP)
yarn opt

# 최적화 후 S3 업로드 및 CloudFront 무효화
yarn upload:img

# CloudFront 로그 분석 후 Firebase 저장
yarn log
```

---

## 🛠️ 기술 스택

- **Next.js 14 (Pages Router 사용)**
- **TypeScript, React 19**
- **Firebase Firestore** (RSVP 및 통계 저장)
- **AWS S3 + CloudFront + WebP 최적화**
- **Kakao 공유 API** (개별 맞춤 링크 공유)
- **styled-components, recharts, zustand** 등

### 🧭 App Router 대신 Page Router를 선택한 이유

Next.js의 최신 App Router는 다양한 기능을 제공하지만, 이 프로젝트에서는 다음 이유로 **Pages Router가 더욱 적합했습니다**:

#### 1. **간단한 라우팅 구조**

- `/` (홈)
- `/yuna` (공유 링크 처리용 게이트)
- `/admin` (관리자 대시보드)

처럼 매우 단순한 페이지 구조에서는 App Router의 nested routing 이점이 거의 없습니다.

#### 2. **CSR 중심 구조**

- Server Component, streaming rendering, React cache 등 App Router 특화 기능이 필요하지 않았고
- 오히려 상태 관리 및 스크립트 실행 타이밍 제어에는 CSR이 더 직관적이었습니다.

#### 3. **불특정 공유 방지를 위한 커스텀 Redirect 처리**

```ts
// pages/yuna.tsx
useEffect(() => {
  const name = searchParams.get("name");
  const via = searchParams.get("via");

  if (name && via === "kakao") {
    router.replace(\`/?name=\${encodeURIComponent(name)}&auth=true\`);
  } else {
    router.replace("/");
  }
}, []);
```

→ App Router로 동일 기능을 구현하려면 middleware 또는 server-only segment 접근 제한 등 **비용 대비 효과가 떨어졌습니다.**

---

## 📦 전역 상태 관리

전역 상태는 상태관리 라이브러리 `zustand` 기반으로 다음 정도의 미니멀한 정보만 관리합니다:

| Store       | 설명                                                                  |
| ----------- | --------------------------------------------------------------------- |
| `fontStore` | 전역 폰트 크기 비율 상태 관리 및 실시간 조절 (CSS 변수 업데이트 포함) |
| `rsvpStore` | RSVP 입력 폼 상태 관리 (`name`, `attending`, `count`, `message`)      |

**React 상태나 URL Params만으로 제어 가능한 부분은 최대한 local state로 유지**하여 앱의 예측 가능성을 높였습니다.

---

## 🔐 환경 변수 (.env.local)

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_NAVER_MAP_CLIENT_ID=...
NEXT_PUBLIC_KAKAO_JS_KEY=...
NEXT_PUBLIC_ADMIN_PASSWORD=...
S3_ACCESS_KEY=...
S3_SECRET_KEY=...
GOOGLE_APPLICATION_CREDENTIALS_JSON={...}
```

📄 상세 구조: [`env.example.md`](docs/env.example.md)

---

## 📬 RSVP (참석 여부 제출)

- Zod 기반 유효성 검증
- zustand 전역 상태 관리 (폼 상태, 열람 토큰 등)
- react-hook-form 기반 폼 입력 처리
- Firebase Firestore에 저장
- "하루 동안 보지 않기"는 쿠키로 처리

📄 상세 구조: [`firebase-schema.md`](docs/firebase-schema.md)

---

## 📊 관리자 페이지 (/admin)

- 비밀번호 입력 후 접근 (`NEXT_PUBLIC_ADMIN_PASSWORD`)
- 탭 구성:
  - RSVP 통계
  - CloudFront 캐시 로그
  - 카카오 메시지 발송
- recharts 기반 RSVP 및 CDN 통계 시각화
- Firestore에서 데이터를 불러와 실시간 표시
- KakaoSenderSection: 이름 기반 커스텀 공유 메시지 전송 기능 포함

---

## 🧾 CloudFront 로그 분석 (⚙️ 자동화: CloudFront 로그 분석 GitHub Actions 워크플로우)

- S3 로그를 Gzip 해제 후 파싱
- 요청 수 / Hit / Miss 비율 계산
- 일자별 통계 → Firebase Firestore 저장
- /admin 페이지에서 확인 가능
- github actions
- GitHub Secrets에 S3 및 Firebase 관련 환경 변수를 등록해두면
- 매일 자동으로 CloudFront 로그를 파싱, 분석하여 Firebase에 저장합니다.
- 수동 실행(Workflow dispatch)도 가능하여 필요 시 언제든 재실행할 수 있습니다.

📄 분석 흐름: [`cloudfront-analysis.md`](docs/cloudfront-analysis.md)

---

## 🖼️ 이미지 최적화 및 배포

- `scripts/optimizeImages.ts`:  
  public/photo 내 이미지 → WebP 변환  
  hash 비교로 변경된 파일만 변환
- `scripts/uploadPhotosToS3.ts`:  
  WebP 업로드 (변경 감지)  
  CloudFront 자동 무효화 처리

📄 자세한 과정: [`gallery-image-process.md`](docs/gallery-image-process.md)

---

## 🔒 배포 시 주의사항 (Vercel이 Git push 이벤트를 감지해 자동 배포 실행)

- `.env.local`에 필수 환경 변수 등록
- Firebase 서비스 계정 JSON → `GOOGLE_APPLICATION_CREDENTIALS_JSON`에 문자열로 저장
- S3 + CloudFront 권한 필요
- 로그 분석, 업로드 스크립트 실행 권한 확인 필요

---

## 📝 문서 참고

- [`env.example.md`](docs/env.example.md)
- [`firebase-schema.md`](docs/firebase-schema.md)
- [`cloudfront-analysis.md`](docs/cloudfront-analysis.md)
- [`gallery-image-process.md`](docs/gallery-image-process.md)

---

## 👩🏻 작성자

- 안윤아 (FE)
