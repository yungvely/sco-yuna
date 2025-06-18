"use client";

import { CheckCircle, Copy } from "lucide-react";
import { useState } from "react";
import styled from "styled-components";
import { Heading, Title } from "./styles";
const Wrapper = styled.section`
  position: relative;
  padding: 60px 24px;
  text-align: center;
`;

const Description = styled.p`
  color: #444;
  margin-bottom: 40px;
  word-break: keep-all;
  white-space: normal;
  font-size: 0.95em;
  line-height: 1.6;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
`;

const TabButton = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  border-radius: 999px;
  background: ${({ $active }) => ($active ? "#b5896a" : "#f6f6f6")};
  color: ${({ $active }) => ($active ? "#fff" : "#888")};
  border: none;
  cursor: pointer;
`;

const AccountCard = styled.div`
  max-width: 360px;
  margin: 0 auto;
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  text-align: left;
`;

const AccountRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #eee;
  &:last-child {
    border: 0;
  }
`;

const AccountInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.95rem;
  color: #333;
`;

const Buttons = styled.div`
  display: flex;
  gap: 8px;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  width: 36px;
  height: 36px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #eee;
  }

  img {
    width: 100%;
    border-radius: 4px;
  }

  svg {
    stroke: #888;
    width: 20px;
    height: 20px;
  }
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
  z-index: 99999;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const accounts = {
  groom: [
    { name: "윤명희", bank: "우리", account: "1002-950-374850" },
    {
      name: "한석호",
      bank: "우리",
      account: "1002-135-038041",
      kakao: "https://qr.kakaopay.com/FQSZUaYmN",
    },
  ],
  bride: [
    { name: "안천규", bank: "농협", account: "751818-52-006773" },
    {
      name: "안윤아",
      bank: "우리",
      account: "1002-155-071489",
      kakao: "https://qr.kakaopay.com/Ej7l032cB",
    },
  ],
};

export default function AccountSection() {
  const [selected, setSelected] = useState<"groom" | "bride">("bride");
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text.replace(/-/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Wrapper>
      <Title>ACCOUNT</Title>
      <Heading>마음 전하실 곳</Heading>
      <Description>
        참석이 어려우신 분들을 위해 계좌번호를 기재하였습니다. <br />
        너그러운 마음으로 양해 부탁드립니다.
      </Description>

      <Tabs>
        <TabButton
          $active={selected === "groom"}
          onClick={() => setSelected("groom")}
        >
          신랑측
        </TabButton>
        <TabButton
          $active={selected === "bride"}
          onClick={() => setSelected("bride")}
        >
          신부측
        </TabButton>
      </Tabs>

      <AccountCard>
        {accounts[selected].map(({ name, bank, account, kakao }) => (
          <AccountRow key={name + account}>
            <AccountInfo>
              <div>
                <strong>{name}</strong> ({bank}) {account}
              </div>
              <Buttons>
                <IconButton
                  onClick={() => handleCopy(account)}
                  aria-label="계좌번호 복사"
                >
                  <Copy />
                </IconButton>
                {kakao && (
                  <IconButton
                    as="a"
                    href={kakao}
                    target="_blank"
                    aria-label="카카오페이 송금"
                  >
                    <img
                      src="https://logo-resources.thevc.kr/organizations/200x200/2d194b70040d62c6a6452eaba311a3a919dcaca165e6abdae66586f8ca1690ba_1614220511509955.jpg"
                      alt="카카오페이"
                    />
                  </IconButton>
                )}
              </Buttons>
            </AccountInfo>
          </AccountRow>
        ))}
      </AccountCard>

      {copied && (
        <CopyPopup>
          <CheckCircle size={18} /> 복사되었습니다
        </CopyPopup>
      )}
    </Wrapper>
  );
}
