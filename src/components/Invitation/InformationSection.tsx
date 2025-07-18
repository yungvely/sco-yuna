"use client";

import { getAssetUrl } from "@/lib/getAssetUrl";
import { motion } from "framer-motion";
import Image from "next/image";
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
  margin-top: 16px;
`;

const PhotoWrapper = styled.div`
  border-radius: 16px;
  overflow: hidden;
  width: 280px;
  height: 160px;
  margin: 0 auto 20px;
`;
interface Props {
  variant?: "yuna" | "sco" | null;
}
const InformationSection = ({ variant }: Props) => {
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
            src={getAssetUrl("photobooth.webp")}
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
          {variant === "yuna" ? (
            <>
              포토부스를 설치할 예정이야
              <br />
              가능하다면 좀 일찍와서
              <br />
              이용해 주길 바라 📷
              <br />
              사진은 나중에 다 전달해줄게~ 🥹
            </>
          ) : (
            <>
              포토부스가 설치될 예정입니다.
              <br />
              귀한 발걸음 해주신 여러분의
              <br />
              환한 미소와 따뜻한 말씀 남겨주시면
              <br />
              소중히 간직하도록 하겠습니다.
            </>
          )}
        </Description>
      </Wrapper>
    </motion.div>
  );
};

export default InformationSection;
