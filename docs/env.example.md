# 환경변수 설명 (.env.local 예시)

## ✅ 공통

| 변수명            | 설명                                    |
| ----------------- | --------------------------------------- |
| `NEXT_PUBLIC_ENV` | 환경 구분 (예: production, development) |
| `ADMIN_PASSWORD`  | 관리자 페이지 접근 비밀번호             |

## 🔥 Firebase

| 변수명                                     | 설명                   |
| ------------------------------------------ | ---------------------- |
| `NEXT_PUBLIC_FIREBASE_API_KEY`             | Firebase API Key       |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`         | Firebase 인증 도메인   |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID`          | Firebase 프로젝트 ID   |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`      | Firebase 스토리지 버킷 |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | 메시징 발신 ID         |
| `NEXT_PUBLIC_FIREBASE_APP_ID`              | Firebase 앱 ID         |

## 🗺️ 외부 API

| 변수명                            | 설명                      |
| --------------------------------- | ------------------------- |
| `NEXT_PUBLIC_NAVER_MAP_CLIENT_ID` | 네이버 지도 클라이언트 ID |
| `NEXT_PUBLIC_KAKAO_JS_KEY`        | 카카오 JS SDK Key         |

## ☁️ AWS (S3, CloudFront)

| 변수명          | 설명                                 |
| --------------- | ------------------------------------ |
| `S3_ACCESS_KEY` | AWS S3 접근 키                       |
| `S3_SECRET_KEY` | AWS S3 시크릿 키                     |
| `S3_REGION`     | S3 리전 (예: ap-northeast-2)         |
| `S3_BUCKET`     | 로그 및 이미지 업로드용 S3 버킷 이름 |
| `S3_LOG_PREFIX` | CloudFront 로그 경로 Prefix          |

## 🔐 서비스 계정

| 변수명                                | 설명                           |
| ------------------------------------- | ------------------------------ |
| `GOOGLE_APPLICATION_CREDENTIALS_JSON` | Firebase Admin SDK JSON 문자열 |
