"use client";

import { useEffect } from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(1.05); }
  to { opacity: 1; transform: scale(1); }
`;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: #fff7f0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 1s ease;
`;

const Emoji = styled.div`
  font-size: 4rem;
`;

const Title = styled.div`
  margin-top: 16px;
  font-size: 1.5rem;
  font-weight: 600;
`;

const Opening = ({ onEnd }: { onEnd: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onEnd();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onEnd]);

  return (
    <Wrapper>
      <Emoji>💌</Emoji>
      <Title>우리 결혼해요</Title>
    </Wrapper>
  );
};

export default Opening;
