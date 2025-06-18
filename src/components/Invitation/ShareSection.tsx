//src/components/Invitation/ShareSection.tsx
"use client";

import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Title } from "./styles";

const Wrapper = styled.section`
  position: relative;
  padding: 60px 24px;
  text-align: center;
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

const CopyPopup = styled.div`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: #000;
  color: #fff;
  padding: 12px 24px;
  border-radius: 8px;
  z-index: 999;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ShareButton = styled.button`
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
type Props = {
  variant: "yuna" | "sco" | null;
};

const ShareSection = ({ variant }: Props) => {
  const resURL = `https://sco-yuna.kr/${variant ?? ""}`;
  const [copied, setCopied] = useState(false);

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

    // window.Kakao.Share.sendDefault({
    //   objectType: "feed",
    //   content: {
    //     title: "25.8.23 석호 ❤️ 윤아 결혼합니다",
    //     description:
    //       "기쁜 날, 가까이서 축복해 주시면 더없는 기쁨으로 간직하겠습니다.",
    //     imageUrl: `https://assets.sco-yuna.kr/og/${variant ?? "default"}.webp`,
    //     link: {
    //       mobileWebUrl: resURL,
    //       webUrl: resURL,
    //     },
    //   },
    //   buttons: [
    //     {
    //       title: "모바일 청첩장 보기",
    //       link: {
    //         mobileWebUrl: resURL,
    //         webUrl: resURL,
    //       },
    //     },
    //   ],
    // });

    window.Kakao.Share.sendCustom({
      templateId: variant === "yuna" ? "" : 121566,
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(resURL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Wrapper>
      <Title>SHARE</Title>
      {/* <Heading>함께하고 싶은 사람에게</Heading> */}
      <ButtonGroup>
        <ShareButton onClick={handleKakaoShare}>
          카카오톡으로 공유하기
        </ShareButton>
        <ShareButton onClick={handleCopy}>링크 공유하기</ShareButton>
      </ButtonGroup>

      {copied && (
        <CopyPopup>
          <CheckCircle size={18} /> 복사되었습니다
        </CopyPopup>
      )}
    </Wrapper>
  );
};

export default ShareSection;
