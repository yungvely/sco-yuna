// src/pages/index.tsx
"use client";

import { FontSizeControl } from "@/components/common/FontSizeController";
import Invitation from "@/components/Invitation";
import BackgroundMusic from "@/components/Invitation/BackgroundMusic";
import Opening from "@/components/Opening";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [opening, setOpening] = useState(false);
  const [variant, setVariant] = useState<"yuna" | "sco" | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    const nameParam = searchParams.get("name");
    const authParam = searchParams.get("auth");

    if (nameParam && authParam === "true") {
      setVariant("yuna");
      setNickname(nameParam);

      window.history.replaceState(null, "", "/");
    } else if (window.location.pathname.startsWith("/sco")) {
      setVariant("sco");
    } else {
      setVariant(null);
      setNickname(null);
    }

    setIsInitialized(true);
    setOpening(true);
  }, []);

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

  if (!isInitialized) return;
  return (
    <>
      <Head>
        <title>석호 ❤️ 윤아 결혼합니다</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
        />

        <meta name="description" content="소중한 분들을 초대합니다" />
        <meta property="og:title" content="25.8.23 석호 ❤️ 윤아 결혼합니다" />
        <meta property="og:description" content="소중한 분들을 초대합니다" />
        <meta
          property="og:image"
          content="https://assets.sco-yuna.kr/og/og_image.webp"
        />
        <meta property="og:image:width" content="768" />
        <meta property="og:image:height" content="1149" />

        <meta property="og:url" content="https://sco-yuna.kr" />
        <meta property="og:type" content="website" />

        {/* 트위터 카드 */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="25.8.23 석호 ❤️ 윤아 결혼합니다" />
        <meta name="twitter:description" content="소중한 분들을 초대합니다" />
        <meta
          name="twitter:image"
          content="https://assets.sco-yuna.kr/og/og_image.webp"
        />
      </Head>

      <Invitation nickname={nickname} variant={variant} openingEnd={opening} />
      <Opening nickname={nickname} onEnd={() => setOpening(false)} />
      {!opening && <BackgroundMusic />}
      <FontSizeControl visible={!opening && variant !== "yuna"} />
      <SpeedInsights />
    </>
  );
}
