"use client";

import { motion } from "framer-motion";
import Image from "next/image";
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
  margin-bottom: 24px;
`;

const Description = styled.p`
  font-size: 0.875rem;
  color: #333;
  line-height: 1.7;
  margin-top: 16px;
`;

const PhotoWrapper = styled.div`
  border-radius: 16px;
  overflow: hidden;
  width: 280px;
  height: 160px;
  margin: 0 auto 20px;
`;

const InformationSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <Wrapper>
        <Title>INFORMATION</Title>
        <Heading>예식정보 및 안내사항</Heading>
        <PhotoWrapper>
          <Image
            src="/photo/photobooth.jpg"
            //https://cdn.imweb.me/thumbnail/20230526/1d2af35423c39.jpg
            alt="포토부스"
            width={280}
            height={160}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </PhotoWrapper>
        <Heading style={{ fontSize: "16px", marginBottom: 8 }}>
          포토부스 이용안내
        </Heading>
        <Description>
          포토부스가 설치될 예정입니다.
          <br />
          귀한 발걸음 해주신 여러분의
          <br />
          환한 미소와 따뜻한 말씀 남겨주시면
          <br />
          소중히 간직하도록 하겠습니다.
        </Description>
      </Wrapper>
    </motion.div>
  );
};

export default InformationSection;
