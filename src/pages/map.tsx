// src/pages/map.tsx
import Head from "next/head";

export default function MapPage() {
  return (
    <>
      <Head>
        <title>오시는 길 - 석호 ❤️ 윤아 결혼식</title>
      </Head>
      <iframe
        src="https://kko.kakao.com/5NzWy7Mue3"
        style={{ width: "100%", height: "100vh", border: "none" }}
        title="르비르모어 약도"
        allowFullScreen
      />
    </>
  );
}
