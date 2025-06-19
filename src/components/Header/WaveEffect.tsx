"use client";

import styled from "styled-components";

const WaveContainer = styled.div<{ top?: boolean }>`
  position: absolute;
  width: 100%;
  height: 60px;
  transform: ${({ top }) => (top ? "rotate(180deg)" : "none")};
  overflow: hidden;
  bottom: 0;
  left: 0;
  z-index: 1;

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  .u-1 {
    animation: moveWave 12s linear infinite;
  }

  .u-2 {
    animation: moveWave 17s linear infinite;
  }

  .u-3 {
    animation: moveWave 15s linear infinite;
  }

  .u-4 {
    animation: moveWave 20s linear infinite;
  }

  @keyframes moveWave {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-80px);
    }

    50% {
      transform: translateX(0);
    }
    75% {
      transform: translateX(80px);
    }
    100% {
      transform: translateX(0);
    }
  }
`;

const Wave = () => (
  <svg
    viewBox="0 24 150 28"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <path
        id="gentle-wave"
        d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z"
      />
    </defs>
    <g className="parallax">
      <use
        className="u-1"
        xlinkHref="#gentle-wave"
        x="48"
        y="0"
        fill="rgba(255,255,255,0.7)"
      />
      <use
        className="u-2"
        xlinkHref="#gentle-wave"
        x="48"
        y="3"
        fill="rgba(255,255,255,0.5)"
      />
      <use
        className="u-3"
        xlinkHref="#gentle-wave"
        x="48"
        y="5"
        fill="rgba(255,255,255,0.3)"
      />
      <use
        className="u-4"
        xlinkHref="#gentle-wave"
        x="48"
        y="7"
        fill="rgba(255,255,255,0.2)"
      />
    </g>
  </svg>
);

type Props = {
  top?: boolean;
};

const WaveEffect = ({ top }: Props) => {
  return (
    <WaveContainer top={top}>
      <Wave />
    </WaveContainer>
  );
};

export default WaveEffect;
