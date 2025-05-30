"use client";

import { motion } from "framer-motion";
import { forwardRef } from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import WaveEffect from "./WaveEffect";

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  height: 80vh;
  max-height: 640px;
  max-width: 100%;

  aspect-ratio: 430 / 640;
  margin: 0 auto;

  overflow: hidden;
`;

const BackgroundImage = styled.div<{ src: string }>`
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
`;

export const SvgDefs = () => (
  <svg
    viewBox="0 0 430 700"
    preserveAspectRatio="xMidYMid meet"
    style={{ width: 0, height: 0, position: "absolute" }}
  >
    <defs>
      <mask id="arch-hole-mask" maskUnits="userSpaceOnUse">
        <g transform="translate(0, 0)">
          <rect width="430" height="700" fill="white" />
          <path
            fill="black"
            d="
            M 50 190
            A 200 200 0 0 1 380 190
            L 380 580
            L 50 580
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
  height: 700px;
  background: white;

  mask: url(#arch-hole-mask);
  mask-repeat: no-repeat;
  mask-size: contain;
  mask-position: center;

  -webkit-mask: url(#arch-hole-mask);
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-size: contain;
  -webkit-mask-position: center;

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
  height: 80%;
  pointer-events: none;
  z-index: 1;
`;

type Props = {
  imageSrc: string;
  children?: React.ReactNode;
};

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
          <BackgroundImage
            src={
              imageSrc
              //   "https://prodmsamedia.mymusictaste.com/cshopproject/images/f1031cb8377b11efa4190a58a9feac02.jpeg"
            }
          />
          <CanvasWrapper>{children}</CanvasWrapper>
          <SvgDefs />
          <ArchMaskOverlay />
          <WaveEffect />
        </Wrapper>
      </motion.div>
    );
  }
);

export default ArchHero;
