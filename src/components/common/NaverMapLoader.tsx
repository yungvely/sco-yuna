// src/components/common/NaverMapLoader.tsx
"use client";

import Script from "next/script";

const NaverMapLoader = () => {
  const clientId = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;

  return (
    <Script
      strategy="afterInteractive"
      src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
    />
  );
};

export default NaverMapLoader;
