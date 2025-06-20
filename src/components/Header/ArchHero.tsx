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
  width: 84%;
  height: 94%;
  top: 35px;
  left: 0;
  right: 0;
  margin: 0 auto;
  overflow: hidden;
  border-top-left-radius: 200px;
  border-top-right-radius: 200px;
`;

const FadingImage = styled(Image)<{ $visible: boolean }>`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 1.3s ease-in-out;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform-origin: center center;
`;

const CrossFadeImages = ({
  srcA,
  srcB,
  children,
}: {
  srcA: string;
  srcB: string;
  children?: React.ReactNode;
}) => {
  const [showA, setShowA] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowA((prev) => !prev);
    }, 1800);
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
        priority
        style={{
          top: "-75px",
          left: "14px",
          zIndex: 1,
          transform: "rotateZ(0.6deg) scale(1.15)",
        }}
      />
      <FadingImage
        src={srcB}
        alt="second"
        fill
        $visible={true}
        unoptimized
        priority
        style={{ top: "-79px", left: "13px", transform: "scale(1.15)" }}
      />
      {children}
    </CrossFadeWrapper>
  );
};

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
              <>
                <Image
                  src={imageSrc}
                  alt="first picture"
                  fill
                  priority
                  unoptimized
                  style={{ top: "-80px" }}
                />
                <CanvasWrapper>{children}</CanvasWrapper>
              </>
            ) : (
              <CrossFadeImages
                srcA={getAssetUrl("studio/studio_015.webp")}
                srcB={getAssetUrl("studio/studio_016.webp")}
              >
                <CanvasWrapper>{children}</CanvasWrapper>
              </CrossFadeImages>
            )}
          </AnimatedImageWrapper>
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
