# 📸 이미지 최적화 및 배포 흐름

## 🧼 1. WebP 최적화

`yarn opt` 실행 시 `scripts/optimizeImages.ts` 동작:

- `public/photo/`의 jpg/png 이미지 → `.webp` 변환
- 파일 해시 비교로 변경된 것만 다시 변환
- `.webp-hash.json`에 해시 저장

## ☁️ 2. S3 업로드

`yarn upload:img` 실행 시:

- 변경된 webp/gif/svg 파일만 S3 업로드
- 원본 jpg/png 파일이 삭제 → S3 webp에서도 삭제
- 변경된 파일 경로 → CloudFront invalidate 요청
- 업로드 기록은 `.s3-uploaded.json`으로 관리
