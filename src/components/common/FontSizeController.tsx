"use client";

import { useFontStore } from "@/store/fontStore";
import { motion } from "framer-motion";
import styled from "styled-components";

const MotionWrapper = styled(motion.div)`
  position: fixed;
  bottom: 16px;
  right: 50%;
  transform: translateX(calc(212.5px - 16px)); // (425 / 2 - 16px)
  z-index: 998;

  @media (max-width: 425px) {
    left: auto;
    right: 16px;
    transform: none;
  }
`;

const Controller = styled.div`
  display: flex;
  gap: 8px;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 8px 12px;
`;

const Button = styled.button`
  background: #f5f5f5;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 20px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #e5e5e5;
  }

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`;

export const FontSizeControl = ({ visible = true }: { visible?: boolean }) => {
  const { scale, increase, decrease } = useFontStore();

  return (
    <MotionWrapper
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      style={{
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <Controller>
        <Button onClick={decrease} disabled={scale <= 1.0}>
          가-
        </Button>
        <Button onClick={increase} disabled={scale >= 1.2}>
          가+
        </Button>
      </Controller>
    </MotionWrapper>
  );
};
