"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import { Heading, Title } from "./styles";

const Wrapper = styled.section`
  position: relative;
  padding: 60px 24px;
  text-align: center;
`;

const Description = styled.p`
  font-size: 0.95rem;
  color: #333;
  line-height: 1.7;
  margin-bottom: 24px;
`;

const Button = styled.button`
  font-size: 0.95rem;
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
          특별한 날 축하의 마음으로
          <br />
          참석해주시는 모든 분들을
          <br />
          귀하게 모시고자 여쭙는 것이니,
          <br />
          참석의 부담은 가지지 말아주시고,
          <br />
          참석정보를 알려주시면 감사하겠습니다.
        </Description>
        <Button onClick={onClick}>참석의사 전달하기</Button>
      </Wrapper>
    </motion.div>
  );
};

export default RSVPSection;
