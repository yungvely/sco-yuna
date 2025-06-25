"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import "swiper/css";
import { Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// ===== Styled Components =====
const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SwiperContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 425px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 38px;
  height: 38px;
  line-height: 1;
  background: rgba(255, 215, 51, 0.4);
  border-radius: 50%;
  border: none;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  z-index: 1001;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.2s;
`;

const NavButton = styled.button<{ left?: boolean }>`
  position: absolute;
  top: 50%;
  ${(props) => (props.left ? "left: 12px;" : "right: 12px;")}
  transform: translateY(-50%);
  background: rgba(255, 215, 51, 0.4);
  border-radius: 50%;
  width: 38px;
  height: 38px;
  line-height: 1;
  font-size: 32px;
  color: rgba(255, 255, 255, 0.8);
  border: none;
  cursor: pointer;
  z-index: 1001;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  transition: all 0.2s;
`;

const SlideWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
`;

type Props = {
  open: boolean;
  images: string[];
  index: number;
  onClose: () => void;
  onIndexChange?: (index: number) => void;
};

export const CustomLightbox = ({
  open,
  images,
  index,
  onClose,
  onIndexChange,
}: Props) => {
  const swiperRef = useRef<any>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <Overlay
      key="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <SwiperContainer>
        <CloseButton onClick={onClose}>✕</CloseButton>
        <NavButton left onClick={() => swiperRef.current?.slidePrev()}>
          ‹
        </NavButton>
        <NavButton onClick={() => swiperRef.current?.slideNext()}>›</NavButton>

        <Swiper
          onSwiper={(swiper: any) => (swiperRef.current = swiper)}
          initialSlide={index}
          loop
          keyboard={{ enabled: true }}
          spaceBetween={12}
          modules={[Keyboard]}
          style={{ width: "100%", height: "100%" }}
          onRealIndexChange={(swiper: { realIndex: number }) => {
            onIndexChange?.(swiper.realIndex);
          }}
        >
          {images.map((src) => (
            <SwiperSlide key={src}>
              <SlideWrapper>
                <Image src={src} alt="Gallery" />
              </SlideWrapper>
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperContainer>
    </Overlay>
  );
};
