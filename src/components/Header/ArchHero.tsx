"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { forwardRef, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import { getAssetUrl } from "../../lib/getAssetUrl";
import Typography from "../common/Typography";
import WaveEffect from "./WaveEffect";

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  max-height: 600px;
  max-width: 100%;
  aspect-ratio: 430 / 600;
  margin: 0 auto 20px;
  padding: 0 24px;

  overflow: hidden;
`;

const AnimatedImageWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
  left: 0;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const CrossFadeWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 4px;
`;

const FadingImage = styled(Image)<{ $visible: boolean }>`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 1.5s ease-in-out;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
`;

const CrossFadeImages = ({ srcA, srcB }: { srcA: string; srcB: string }) => {
  const [showA, setShowA] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowA((prev) => !prev);
    }, 1500); // 3초마다 전환
    return () => clearInterval(interval);
  }, []);

  return (
    <CrossFadeWrapper>
      <FadingImage
        src={srcA}
        alt="first"
        fill
        $visible={showA}
        unoptimized
        style={{
          top: "-73px",
          right: "15px",
          zIndex: 1,
          transform: "rotateZ(0.5deg)",
        }}
      />
      <FadingImage
        src={srcB}
        alt="second"
        fill
        $visible={true}
        unoptimized
        style={{ top: "-80px", right: "10px" }}
      />
    </CrossFadeWrapper>
  );
};
export const SvgDefs = () => (
  <svg
    viewBox="0 0 430 700"
    preserveAspectRatio="xMidYMid meet"
    style={{ width: 0, height: 0, position: "absolute" }}
  >
    <defs>
      <mask id="arch-hole-mask" maskUnits="userSpaceOnUse">
        <g transform="translate(0, 0)">
          <rect width="430" height="600" fill="white" />
          <path
            fill="black"
            d="
            M 50 190
            A 200 200 0 0 1 380 190
            L 380 600
            L 50 600
            Z
            "
          />
        </g>
      </mask>
    </defs>
  </svg>
);

export const ArchMaskOverlay = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  width: 430px;
  height: 640px;
  background: white;

  mask: url(#arch-hole-mask);
  mask-repeat: no-repeat;
  mask-size: contain;
  mask-position: center bottom;

  -webkit-mask: url(#arch-hole-mask);
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-size: contain;
  -webkit-mask-position: center bottom;

  mask-composite: exclude;
  -webkit-mask-composite: destination-out;

  z-index: 10;
  pointer-events: none;
`;

const CanvasWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
  z-index: 1;
  opacity: 0.7;
`;

type Props = {
  imageSrc?: string;
  children?: React.ReactNode;
};

const TopDate = styled.div`
  position: relative;
  top: 25px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ArchHero = forwardRef<HTMLDivElement, Props>(
  ({ imageSrc, children }, ref) => {
    const { ref: inViewRef, inView } = useInView({
      triggerOnce: true,
      threshold: 0.2,
    });

    const setRefs = (el: HTMLDivElement) => {
      inViewRef(el);
      if (typeof ref === "function") {
        ref(el);
      } else if (ref) {
        (ref as React.RefObject<HTMLDivElement | null>).current = el;
      }
    };

    return (
      <motion.div
        ref={setRefs}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <Wrapper>
          <TopDate>
            <Typography letterSpacing={1} size={0.7}>
              THE WEDDING OF
            </Typography>
            <Typography size={2.2} lineHeight={1.7}>
              08.23
            </Typography>
          </TopDate>
          <AnimatedImageWrapper>
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt="first picture"
                fill
                priority
                unoptimized
                style={{ top: "-80px" }}
              />
            ) : (
              <CrossFadeImages
                srcA={getAssetUrl("studio/studio_015.webp")}
                srcB={getAssetUrl("studio/studio_016.webp")}
              />
            )}
          </AnimatedImageWrapper>
          <CanvasWrapper>{children}</CanvasWrapper>
          <SvgDefs />
          <ArchMaskOverlay />
          <WaveEffect />
        </Wrapper>

        <Typography
          size={1}
          lineHeight={1.8}
          center
          as="div"
          style={{ margin: "40px 0 0" }}
        >
          2025년 8월 23일 토요일 오후 12시 30분 <br />
          르비르모어 2층 클리타홀 (단독홀)
        </Typography>
      </motion.div>
    );
  }
);

export default ArchHero;
