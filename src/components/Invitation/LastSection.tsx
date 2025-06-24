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

const LastSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const onClick = () => {
    window.location.replace("/");
  };
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <Wrapper>
        <Title>Last</Title>
        <Heading>마지막으로</Heading>
        <Description>
          이 초대장은 나에게 받은 카톡으로만 들어올 수 있어🥹
          <br />
          찾아오는 길 / 계좌 정보는 공용 청첩장에서 확인해줘
          <br />
          <br />
          항상 날 이뻐해줘서 고마워 <br />
          앞으로도 잘 지내자, 잘 부탁해 🩷
          <br />
        </Description>
        <Button onClick={onClick}>공용 청첩장 바로가기 👉🏻</Button>
      </Wrapper>
    </motion.div>
  );
};

export default LastSection;
