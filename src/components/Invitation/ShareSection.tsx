"use client";

import { useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  padding: 80px 24px;
  text-align: center;
`;

const Title = styled.h3`
  font-size: 16px;
  color: #d17f45;
  margin-bottom: 12px;
  letter-spacing: 1px;
`;

const Heading = styled.h2`
  font-size: 20px;
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
  font-size: 14px;
`;

const ShareSection = () => {
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
        title: "석호 ❤️ 윤아 결혼합니다",
        description: "2025년 8월 23일 토요일 낮 12시 30분",
        imageUrl: "https://yourdomain.com/images/og-default.jpg",
        link: {
          mobileWebUrl: "https://yourdomain.com",
          webUrl: "https://yourdomain.com",
        },
      },
      buttons: [
        {
          title: "모바일 청첩장 보기",
          link: {
            mobileWebUrl: "https://yourdomain.com",
            webUrl: "https://yourdomain.com",
          },
        },
        {
          title: "위치 보기",
          link: {
            mobileWebUrl:
              "https://map.kakao.com/link/map/르비르모어 2F 클리타홀,37.5035853,127.0444764",
            webUrl:
              "https://map.kakao.com/link/map/르비르모어 2F 클리타홀,37.5035853,127.0444764",
          },
        },
      ],
    });
  };

  return (
    <Wrapper>
      <Title>SHARE</Title>
      <Heading>함께하고 싶은 사람에게</Heading>
      <ButtonGroup>
        <ShareButton onClick={handleKakaoShare}>
          카카오톡으로 공유하기
        </ShareButton>
        <ShareButton
          onClick={() => {
            navigator.clipboard.writeText("https://yourdomain.com");
            alert("링크가 복사되었습니다");
          }}
        >
          링크 복사하기
        </ShareButton>
      </ButtonGroup>
    </Wrapper>
  );
};

export default ShareSection;
