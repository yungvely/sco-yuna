// components/FontSizeControl.tsx
"use client";

import { useFontStore } from "@/store/fontStore";
import styled from "styled-components";
import { FixedWrapper } from "../../styles/common";

const Controller = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  gap: 8px;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 8px 12px;
  z-index: 998;
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
`;

export const FontSizeControl = () => {
  const { scale, increase, decrease } = useFontStore();

  return (
    <FixedWrapper position="bottom">
      <Controller>
        <Button onClick={decrease} disabled={scale <= 1.0}>
          가-
        </Button>
        <Button onClick={increase} disabled={scale >= 1.2}>
          가+
        </Button>
      </Controller>
    </FixedWrapper>
  );
};
