// src/pages/index.tsx
"use client";

import { FontSizeControl } from "@/components/common/FontSizeController";
import Invitation from "@/components/Invitation";
import BackgroundMusic from "@/components/Invitation/BackgroundMusic";
import Opening from "@/components/Opening";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

type Props = {
  nickname: string | null;
  variant: "yuna" | "sco" | null;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { req, query } = context;

  const pathname = req.url?.split("?")[0] || "/"; // 정확한 경로만 추출
  let nickname: string | null = null;
  let variant: "yuna" | "sco" | null = null;

  if (pathname.startsWith("/yuna")) {
    variant = "yuna";
  } else if (pathname.startsWith("/sco")) {
    variant = "sco";
  }

  if (typeof query.name === "string" && query.name.trim()) {
    nickname = query.name;
  }

  return { props: { nickname, variant } };
};

export default function HomePage({ nickname, variant }: Props) {
  const [opening, setOpening] = useState(true);
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

      <Invitation variant={variant} openingEnd={opening} />
      <Opening nickname={nickname} onEnd={() => setOpening(false)} />
      {!opening && <BackgroundMusic />}
      <FontSizeControl visible={!opening && variant !== "yuna"} />
    </>
  );
}
