// components/ArchHero.tsx
"use client";

import { motion } from "framer-motion";
import { forwardRef } from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  max-height: 800px;
  overflow: hidden;
`;

const BackgroundImage = styled.div<{ src: string }>`
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
`;

const BottomArch = styled.div`
  position: absolute;
  bottom: -40px;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: #fff;
  border-top-left-radius: 100% 100%;
  border-top-right-radius: 100% 100%;
`;

type Props = {
  imageSrc: string;
};

const ArchHero = forwardRef<HTMLDivElement, Props>(
  ({ imageSrc = "modern" }, ref) => {
    const { ref: inViewRef, inView } = useInView({
      triggerOnce: true,
      threshold: 0.2,
    });

    // ref 병합
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
          <BackgroundImage src={imageSrc} />
          <BottomArch />
        </Wrapper>
      </motion.div>
    );
  }
);

export default ArchHero;
