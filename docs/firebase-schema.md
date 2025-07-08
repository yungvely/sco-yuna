# Firestore 데이터 구조

## 📥 RSVP 정보

컬렉션: `rsvp`

| 필드명 | 타입 | 설명 |
|--------|------|------|
| `attending` | "yes" \| "no" | 참석 여부 |
| `name` | string | 이름 |
| `phone` | string | 연락처 |
| `side` | "groom" \| "bride" | 신랑/신부 측 |
| `message` | string | 자유 메세지 |
| `count` | number | 인원 수 |
| `createdAt` | timestamp | 제출 시간 |

## 📊 CloudFront 로그 통계

컬렉션: `cloudfrontLogs`

| 필드명 | 타입 | 설명 |
|--------|------|------|
| `date` | string (YYYY-MM-DD) | 로그 날짜 |
| `totalRequests` | number | 총 요청 수 |
| `hit` | number | 캐시 Hit 수 |
| `miss` | number | 캐시 Miss 수 |
| `hitRate` | number | 캐시 히트율 (%) |