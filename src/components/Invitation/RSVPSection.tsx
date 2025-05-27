"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";

const Wrapper = styled.section`
  padding: 80px 24px;
  text-align: center;
`;

const Title = styled.h3`
  color: #d17f45;
  margin-bottom: 12px;
  letter-spacing: 1px;
`;

const Heading = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: 0.875rem;
  color: #333;
  line-height: 1.7;
  margin-bottom: 24px;
`;

const Button = styled.button`
  font-size: 0.875rem;
  padding: 12px 20px;
  border: 1px solid #e6dfd9;
  border-radius: 12px;
  background: #fff;
  color: #b56b43;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    background: #f9f6f5;
  }
`;

interface Props {
  onClick: () => void;
}

const RSVPSection = ({ onClick }: Props) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <Wrapper>
        <Title>R.S.V.P.</Title>
        <Heading>참석 의사 전달</Heading>
        <Description>
          신랑, 신부에게 참석의사를
          <br />
          미리 전달할 수 있어요.
        </Description>
        <Button onClick={onClick}>참석의사 전달하기</Button>
      </Wrapper>
    </motion.div>
  );
};

export default RSVPSection;
