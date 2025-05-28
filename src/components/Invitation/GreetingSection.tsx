"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
type GreetingVariant = "yunasco" | "modern";

interface Props {
  variant?: GreetingVariant;
}

const Wrapper = styled.section`
  padding: 55px 24px;
  text-align: center;
  color: #333;
`;

const Title = styled.h2`
  font-size: 1.125rem;
  letter-spacing: 1px;
  margin-bottom: 16px;
  color: #d17f45;
`;

const MainText = styled.p`
  line-height: 1.8;
  white-space: pre-line;
`;

const BoldName = styled.span`
  font-size: 1.15rem;
  font-weight: 700;
  color: #000;
`;

const Names = styled.div`
  margin-top: 32px;
  font-size: 0.875rem;
  line-height: 1.8;
  color: #888;
`;

const Center = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;
`;

const GreetingSection = ({ variant = "modern" }: Props) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const imgPath = "/icons/ChrysanthemumIcon.svg";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <Wrapper>
        <Title>INVITATION</Title>
        {variant === "modern" ? (
          <MainText>
            소중한 분들을 초대합니다{"\n\n"}
            얼마나 고운 인연이기에 우리는 만났을까요{"\n\n"}
            따스한 봄날, 사랑하는 사람을 만나{"\n"}
            사랑하기 좋은 푸른달 아래{"\n"}
            저희 두 사람 결혼합니다.{"\n\n"}
            꽃보다 아름답게 햇살보다 따뜻하게 살 수 있도록{"\n"}
            앞날을 축복해 주시면 감사하겠습니다.
          </MainText>
        ) : (
          <MainText>
            푸른 하늘에 수 놓인 햇살이{"\n"}보<BoldName>석</BoldName>처럼
            반짝이는 맑은 여름날{"\n"}
            서로의 <BoldName>호</BoldName>흡과 발걸음이 맞닿은 하나 된 삶{"\n"}
            <BoldName>윤</BoldName>슬과 같이 빛나는 축복 속에서{"\n"}
            <BoldName>아</BoldName>름다운 여정을 시작하려 합니다{"\n\n"}
            소중한 분들과 함께하고 싶습니다{"\n"}
            귀한 발걸음 해주시면 감사하겠습니다.
          </MainText>
        )}
        <Names>
          <Center>
            <Image src={imgPath} width={12} height={12} alt="국화" />
            한우종 · 윤명희의 아들 한석호
          </Center>
          <Center>
            안천규 ·
            <Image src={imgPath} width={12} height={12} alt="국화" />
            박경숙의 딸 안윤아
          </Center>
        </Names>
      </Wrapper>
    </motion.div>
  );
};

export default GreetingSection;
