"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";

const Wrapper = styled.section`
  padding: 80px 24px;
  text-align: center;
  color: #333;
`;

const Title = styled.h2`
  font-size: 18px;
  letter-spacing: 1px;
  margin-bottom: 16px;
  color: #d17f45;
`;

const MainText = styled.p`
  font-size: 16px;
  line-height: 1.8;
  white-space: pre-line;
`;

const Names = styled.p`
  margin-top: 32px;
  font-size: 14px;
  color: #888;
`;

const GreetingSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <Wrapper>
        <Title>INVITATION</Title>
        <MainText>
          소중한 분들을 초대합니다{"\n\n"}
          얼마나 고운 인연이기에 우리는 만났을까요{"\n\n"}
          따스한 봄날, 사랑하는 사람을 만나{"\n"}
          사랑하기 좋은 푸른달 아래{"\n"}
          저희 두 사람 결혼합니다.{"\n\n"}
          꽃보다 아름답게 햇살보다 따뜻하게 살 수 있도록{"\n"}
          앞날을 축복해 주시면 감사하겠습니다.
        </MainText>
        <Names>
          한우종 · 윤명희의 아들 한석호
          <br />
          안천규 · 박경숙의 딸 안윤아
        </Names>
      </Wrapper>
    </motion.div>
  );
};

export default GreetingSection;
