import Script from "next/script";

const KakaoInit = () => (
  <Script
    src="https://t1.kakaocdn.net/kakao_js_sdk/2.5.0/kakao.min.js"
    strategy="beforeInteractive"
    onLoad={() => {
      window.Kakao?.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
      //   console.log("✅ Kakao SDK Initialized", window.Kakao?.isInitialized());
    }}
  />
);

export default KakaoInit;
