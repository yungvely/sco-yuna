"use client";

import { useEffect, useRef, useState } from "react";
import ArchHero from "../Header/ArchHero";
import { FlowerCanvas } from "../Header/FlowerCanvas";
import PosterHero from "../Header/PosterHero";

type Props = {
  variant: "yuna" | "sco" | null;
};

const MainVisualSection = ({ variant }: Props) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [selectedYunaHero, setSelectedYunaHero] = useState<
    "poster1" | "arch" | null
  >(null);

  useEffect(() => {
    if (variant === "yuna") {
      const options = ["poster1"] as const;
      const random = options[Math.floor(Math.random() * options.length)];
      setSelectedYunaHero(random);
    }
  }, [variant]);

  if (variant === "yuna") {
    if (!selectedYunaHero) return null; // SSR과 hydration mismatch 방지용 초기 렌더 차단

    switch (selectedYunaHero) {
      case "poster1":
        return <PosterHero />;
      // case "poster2":
      //   return <PosterHero2 />;
      case "arch":
        return (
          <ArchHero ref={sectionRef}>
            <FlowerCanvas sectionRef={sectionRef} />
          </ArchHero>
        );
    }
  }

  return (
    <ArchHero ref={sectionRef}>
      <FlowerCanvas sectionRef={sectionRef} />
    </ArchHero>
  );
};

export default MainVisualSection;
