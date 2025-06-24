"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import ContactSection from "./ContactSection";
import { Title } from "./styles";

type GreetingVariant = "yuna" | "sco" | "modern";
interface Props {
  variant?: GreetingVariant;
  nickname?: string | null;
}

const Wrapper = styled.section`
  position: relative;
  padding: 60px 24px;
  text-align: center;
  color: #333;
  overflow: hidden;
  background: #fff;
`;

const MainText = styled.p`
  line-height: 1.8;
  white-space: pre-line;
  background: #fff;
  z-index: 2;
  position: relative;
  padding: 0 24px;
  margin: 45px -24px 0;
`;

const BoldName = styled.span`
  font-size: 1.15rem;
  font-weight: 700;
  color: #000;
`;

const Names = styled.div`
  margin-top: 32px;
  font-size: 0.95rem;
  line-height: 1.8;
  color: #888;
`;

const Center = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;
  img {
    margin: 0 2px;
    opacity: 0.8;
  }
`;

const BorderInvite = styled.div<{
  $position?: "top" | "bottom";
  $variant?: "yuna";
}>`
  width: calc(100% + 48px);
  height: ${({ $variant }) => ($variant === "yuna" ? "100" : "220")}px;
  background-color: transparent;
  border-top-left-radius: ${({ $variant }) =>
      $variant === "yuna" ? "10% " : "100% "}
    100%;
  border-top-right-radius: 100% 100%;
  box-shadow: 1px -12px 17px 5px rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 1;
  pointer-events: none;
  ${({ $position, $variant }) =>
    $position === "bottom"
      ? `
  transform: rotate(180deg);
  margin: ${$variant === "yuna" ? "-25px -24px 0" : "-120px -24px 0"};
  `
      : ` margin: ${
          $variant === "yuna" ? "0 -24px -30px" : "0 -24px -140px"
        }; `};
  &::before {
    content: "";
    position: absolute;
    top: 12px;
    left: 0;
    width: 100%;
    height: 100%;
    border-top-left-radius: 100% 100%;
    border-top-right-radius: 100% 100%;
    border-top: 2px solid #d4af37;
    box-sizing: border-box;
    pointer-events: none;
  }
`;

const GreetingSection = ({ variant = "modern", nickname }: Props) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
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
        <BorderInvite $variant={variant === "yuna" ? "yuna" : undefined} />
        <Title>INVITATION</Title>
        {/* {variant === "modern" ? (
          <MainText>
            소중한 분들을 초대합니다{"\n\n"}
            얼마나 고운 인연이기에 우리는 만났을까요{"\n\n"}
            따스한 봄날, 사랑하는 사람을 만나{"\n"}
            사랑하기 좋은 푸른달 아래{"\n"}
            저희 두 사람 결혼합니다.{"\n\n"}
            꽃보다 아름답게 햇살보다 따뜻하게 살 수 있도록{"\n"}
            앞날을 축복해 주시면 감사하겠습니다.
          </MainText>
        ) : ( )}*/}
        {variant === "yuna" ? (
          <MainText>
            이 초대장을 받았다는 건{"\n"}내가 많이 좋아하는 친구라는 뜻일 거야.
            {"\n"}
            때론 내 짜증을 받아주기도 하고 나를 예뻐해 주고{"\n"}
            때론 조언과 격려 해주던 <BoldName>{nickname}</BoldName> {"\n"}
            너무 고마워 인생에 단 한 번 뿐일{"\n"} 소중한 날을 함께 나누고 싶어
            {"\n"} {"\n"}
            푸른 하늘에 수 놓인 햇살이{"\n"}보<BoldName>석</BoldName>
            처럼 반짝이는 맑은 여름날{"\n"}
            서로의 <BoldName>호</BoldName>흡과 발걸음이 맞닿은 하나 된 삶{"\n"}
            <BoldName>윤</BoldName>슬과 같이 빛나는 축복 속에서{"\n"}
            <BoldName>아</BoldName>름다운 시작을 함께 하려 해{"\n\n"}
            와준다면 너무 든든하고 기쁠 거야 {"\n"}못 와도 괜찮아! {"\n"}
            축하해주는 마음만으로도 진짜 고마워 💛
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
          {variant === "yuna" ? (
            <Center>- 윤아</Center>
          ) : (
            <>
              <Center>
                <Image src={imgPath} width={12} height={12} alt="국화" />
                한우종 · 윤명희의 아들 한석호
              </Center>
              <Center>
                안천규 ·
                <Image src={imgPath} width={12} height={12} alt="국화" />
                박경숙의 딸 안윤아
              </Center>
              <ContactSection />
            </>
          )}
        </Names>
        <BorderInvite
          $position="bottom"
          $variant={variant === "yuna" ? "yuna" : undefined}
        />
      </Wrapper>
    </motion.div>
  );
};

export default GreetingSection;
