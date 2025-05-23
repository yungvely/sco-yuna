export {};

declare global {
  interface Window {
    naver: any; // 또는 naver.maps.Map 등 정확히 선언해도 좋음
    Kakao: any;
  }
}
