// components/Opening.tsx
"use client";

import { useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  justify-content: center;
  justify-self: anchor-center;
`;

const CenterImage = styled.img`
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
`;

const AnimatedText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 2;
  position: absolute;
  font-size: 3rem;
  color: transparent;
  left: 0;
  text-align: center;
  width: 100%;

  .line {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .letter {
    position: relative;
    display: inline-block;
    animation: overlay 3s infinite ease-out;
    font-family: "안창호체", sans-serif;
  }

  .letter::before,
  .letter::after {
    content: attr(data-char);
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
  }

  .letter::before {
    color: gray;
    -webkit-text-stroke: 0.01em rgba(0, 0, 0, 0.3);
  }

  .letter::after {
    background-image: linear-gradient(90deg, white 50%, #f5f5f5);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transform: rotateY(-30deg) skew(0, -10deg);
    transform-origin: left;
    animation: overlay 3s infinite ease-out;
  }

  @keyframes overlay {
    0%,
    20%,
    100% {
      transform: rotateY(-30deg) skew(0, -10deg);
    }
    10% {
      transform: rotateY(0deg) skew(0, 0);
    }
  }
`;

const Opening = ({
  onEnd,
  message = "We're\ngetting married",
  imageSrc = "/test.png",
}: {
  onEnd: () => void;
  message?: string;
  imageSrc?: string;
}) => {
  // const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      // setVisible(false);
      onEnd();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onEnd]);

  return (
    <Wrapper>
      {/* <CenterImage src={imageSrc} alt="Opening image" /> */}
      {/* {visible && ( */}
      <AnimatedText>
        {message.split("\n").map((line, lineIdx) => (
          <div className="line" key={lineIdx}>
            {line.split("").map((char, i) => (
              <span
                className="letter"
                data-char={char}
                key={i}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>
        ))}
      </AnimatedText>
      {/* )} */}
    </Wrapper>
  );
};

export default Opening;
