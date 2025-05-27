// src/pages/index.tsx
"use client";

import Invitation from "@/components/Invitation";
import Opening from "@/components/Opening";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [openingFinished, setOpeningFinished] = useState(false);
  useEffect(() => {
    const preventZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchstart", preventZoom, { passive: false });

    return () => {
      document.removeEventListener("touchstart", preventZoom);
    };
  }, []);

  return (
    <>
      {/* Head는 항상 렌더링 */}
      <Head>
        <title>25.8.23 석호 ❤️ 윤아 결혼합니다</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
        />

        <meta name="description" content="소중한 분들을 초대합니다" />
        {/* OpenGraph / 카카오 미리보기 */}
        <meta property="og:title" content="25.8.23 석호 ❤️ 윤아 결혼합니다" />
        <meta property="og:description" content="소중한 분들을 초대합니다" />
        <meta
          property="og:image"
          content="https://images.theirmood.com/resources/81284/card/onir9Erp90/R4ODazWRcC.jpg?f=webp&w=1280"
        />
        <meta property="og:url" content="https://sco-yuna.kr" />
        <meta property="og:type" content="website" />

        {/* 트위터 카드 */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="25.8.23 석호 ❤️ 윤아 결혼합니다" />
        <meta name="twitter:description" content="소중한 분들을 초대합니다" />
        <meta
          name="twitter:image"
          content="https://images.theirmood.com/resources/81284/card/onir9Erp90/R4ODazWRcC.jpg?f=webp&w=1280"
        />
      </Head>

      {/* Head와 무관한 상태 변화만 아래에서 수행 */}
      {openingFinished ? (
        <Invitation variant="yuna" />
      ) : (
        <Opening onEnd={() => setOpeningFinished(true)} />
      )}
    </>
  );
}
