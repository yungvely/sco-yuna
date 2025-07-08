# CloudFront 로그 분석 흐름

## 🔄 흐름 요약

1. GitHub Actions (`.github/workflows/analyze-cloudfront.yml`)가 매일 자정 실행됨
2. `scripts/analyzeCloudfrontLogs.ts` 실행
3. S3에 저장된 CloudFront 로그 파일을 gzip 해제
4. `x-edge-result-type` 필드 기준으로 Hit/Miss 계산
5. 결과를 Firestore(`cloudfrontLogs` 컬렉션)에 저장
   (결과를 매일 자동으로 github action이 돌도록 구현)

## 🔍 저장 예시

```json
{
  "date": "2025-07-07",
  "totalRequests": 3284,
  "hit": 2710,
  "miss": 574,
  "hitRate": 82.55
}
```

## 📂 로그 파일 경로 예시

- 버킷: `wedding-invitation-logs`
- Prefix: `logs/CloudFront/`
- 파일명: `E1234ABCDEF.2025-07-07-01.gz`

## 📌 분석 대상 필드

- `#Fields:` 라인에서 `x-edge-result-type` 위치를 찾아 각 요청의 hit 여부를 판단
