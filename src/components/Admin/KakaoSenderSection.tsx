"use client";

import { SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  margin-top: 3rem;
  padding: 24px;
  border: 1px solid #eee;
  border-radius: 12px;
  background: #fff;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

const FormRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  flex: 1;
`;

const ShareButton = styled.button`
  padding: 10px 16px;
  border-radius: 8px;
  border: none;
  background: #fee500;
  color: #000;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: #ffeb3b;
  }
`;

const KakaoSenderSection = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.Kakao &&
      !window.Kakao.isInitialized()
    ) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
    }
  }, []);

  const handleShare = () => {
    if (!name.trim()) {
      alert("받는 사람 이름을 입력해주세요.");
      return;
    }

    const url = `yuna?via=kakao&name=${encodeURIComponent(`${name} ♥`)}`;

    window.Kakao.Share.sendCustom({
      templateId: 121655,
      templateArgs: {
        SHARE_URL: url,
      },
    });
  };

  return (
    <Wrapper>
      <Title>카카오 메시지 발송</Title>
      <FormRow>
        <Input
          type="text"
          placeholder="받는 사람 이름"
          value={name}
          onChange={(e: { target: { value: SetStateAction<string> } }) =>
            setName(e.target.value)
          }
        />
        <ShareButton onClick={handleShare}>{name || "이름"} 공유</ShareButton>
      </FormRow>
    </Wrapper>
  );
};

export default KakaoSenderSection;
