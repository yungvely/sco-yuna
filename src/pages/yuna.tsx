"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const YunaGatekeeperPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const name = searchParams.get("name");
    const via = searchParams.get("via");

    if (name && via === "kakao") {
      router.replace(`/?name=${encodeURIComponent(name)}&auth=true`);
    } else {
      router.replace("/");
    }
  }, [router, searchParams]);

  return null;
};

export default YunaGatekeeperPage;
