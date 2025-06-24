// components/Opening.tsx
"use client";

import { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { HandwritingText } from "./common/HandwritingText";

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const Wrapper = styled.div<{ $isFadingOut?: boolean; $nickname?: boolean }>`
  height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  flex-direction: column;
  background: rgba(
    ${({ $nickname }) => ($nickname ? `0, 0, 0,0.6` : ` 255, 255, 255,0.4`)}
  );

  transition: opacity 0.8s ease-in-out;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  pointer-events: none;

  ${({ $isFadingOut }) =>
    $isFadingOut &&
    css`
      animation: ${fadeOut} 1.5s forwards;
    `}
`;
const heartbeat = keyframes`
  0% {
    transform: scale(0.75);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.75);
  }
`;
const Heart = styled.div`
  position: relative;
  width: 50px;
  height: 45px;
  margin: 0 auto;
  top: -100px;
  margin-bottom: -80px;
  animation: ${heartbeat} 1.3s linear infinite;
  transform-origin: center center;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    width: 25px;
    height: 40px;
    border-radius: 25px 25px 0 0;
  }

  &::before {
    left: 25px;
    background: linear-gradient(to top right, #feada6 0%, #f5efef 100%);
    transform: rotate(-45deg);
    transform-origin: 0 100%;
  }

  &::after {
    left: 0;
    background: linear-gradient(to top left, #feada6 0%, #f5efef 100%);
    transform: rotate(45deg);
    transform-origin: 100% 100%;
  }
`;

const SVGContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const Opening = ({
  onEnd,
  nickname,
}: {
  onEnd: () => void;
  nickname: string | null;
}) => {
  const hasNickname = !!nickname;
  const [isFadingOut, setIsFadingOut] = useState(false);

  const fontUrls = hasNickname
    ? [
        "/fonts/밍기적체.ttf",
        "/fonts/HetigonVintage.otf",
        "/fonts/Bedmiwoc.otf",
        "/fonts/노희찬체.otf",
      ]
    : [
        "/fonts/노희찬체.otf",
        "/fonts/Mitchell.otf",
        "/fonts/HetigonVintage.otf",
        "/fonts/Mitchell.otf",
      ];
  const fontSizes = hasNickname ? [40, 0, 0, 35] : [30, 50, 55, 40];
  const lineHeights = hasNickname ? [1, 1.4, 1.8, 1.8] : [1.2, 1.8, 1.8, 1.2];
  const strokeWidths = hasNickname ? [1, 1.4, 1.8, 1] : [1, 1.5, 1.5, 1.3];
  const strokeColors = ["#fff", "#fff", "rgba(63, 81, 181,0.7)", "#f1e0a5"];
  const fillColors = hasNickname
    ? ["#fff", "#fff", "#fdf8d0", "#f1e0a5"]
    : ["#fff", "#fff", "#fdf8d0", "#3F51B5"];
  const lineDelays = [40, 0, 0, 0]; // [100, 200, 300, 800];

  const lines = hasNickname
    ? [`Dear ${nickname}`, "", "", "결혼식에 와줄거지?"]
    : [
        "우리의 결혼식에 초대합니다",
        "Seok Ho & Yun A",
        "2025. 8. 23",
        "Save the Date",
      ];

  return (
    <Wrapper $isFadingOut={isFadingOut} $nickname={!!nickname}>
      <Heart />
      <SVGContainer>
        <HandwritingText
          textLines={lines}
          fontUrls={fontUrls}
          fontSizes={fontSizes}
          strokeWidths={strokeWidths}
          strokeColors={strokeColors}
          fillColors={fillColors}
          lineHeights={lineHeights}
          lineDelays={lineDelays}
          glowLineIndex={0}
          goldLineIndex={2}
          onComplete={() => {
            setIsFadingOut(true);
            setTimeout(() => onEnd(), 700);
          }}
        />
      </SVGContainer>
    </Wrapper>
  );
};

export default Opening;
