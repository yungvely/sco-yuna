//src/components/Invitation/ShareSection.tsx
"use client";

import { useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  position: relative;
  padding: 60px 24px;
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

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const ShareButton = styled.button`
  background: #fbe300;
  color: #000;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
`;

type Props = {
  variant?: "yuna" | "sco";
};

const ShareSection = ({ variant }: Props) => {
  const resURL = `https://sco-yuna.kr/${
    variant ? (variant === "yuna" ? "yuna" : "sco") : ""
  }`;
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.Kakao &&
      !window.Kakao.isInitialized()
    ) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
    }
  }, []);

  const handleKakaoShare = () => {
    if (!window.Kakao?.isInitialized()) return;

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "25.8.23 석호 ❤️ 윤아 결혼합니다",
        description:
          "기쁜 날, 가까이서 축복해 주시면 더없는 기쁨으로 간직하겠습니다.",
        imageUrl: `https://sco-yuna.kr/photo/og/${
          variant ? "default" : "yuna"
        }.jpg`,
        link: {
          mobileWebUrl: resURL,
          webUrl: resURL,
        },
      },
      buttons: [
        {
          title: "모바일청첩장",
          link: {
            mobileWebUrl: resURL,
            webUrl: resURL,
          },
        },
        {
          title: "위치 보기",
          link: {
            mobileWebUrl: "https://sco-yuna.kr/map",
            webUrl: "https://sco-yuna.kr/map",
          },
        },
      ],
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(resURL);
    alert("링크가 복사되었습니다 ✨");
  };

  return (
    <Wrapper>
      <Title>SHARE</Title>
      <Heading>함께하고 싶은 사람에게</Heading>
      <ButtonGroup>
        <ShareButton onClick={handleKakaoShare}>
          카카오톡으로 공유하기
        </ShareButton>
        <ShareButton onClick={handleCopy}>링크 복사하기</ShareButton>
      </ButtonGroup>
    </Wrapper>
  );
};

export default ShareSection;
