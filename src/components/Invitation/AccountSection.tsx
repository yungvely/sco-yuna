"use client";

import { CheckCircle } from "lucide-react";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  padding: 55px 24px;
  text-align: center;
`;

const Title = styled.h3`
  color: #b27650;
  margin-bottom: 12px;
  letter-spacing: 1px;
`;

const Heading = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 24px;
`;

const Description = styled.p`
  color: #444;
  margin-bottom: 40px;
  white-space: pre-line;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  border-radius: 999px;
  background: ${({ active }) => (active ? "#000" : "#f6f6f6")};
  color: ${({ active }) => (active ? "#fff" : "#888")};
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
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
`;

const KakaoPay = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  padding: 12px;
  background: #fef01b;
  border-radius: 8px;
  color: #000;
  text-decoration: none;
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

const accounts = {
  groom: [
    { name: "윤명희", bank: "국민", account: "64510204009604" },
    { name: "한석호", bank: "우리", account: "19608826802001", kakao: "" },
  ],
  bride: [
    { name: "안천규", bank: "하나", account: "40591003255907" },
    {
      name: "안윤아",
      bank: "우리",
      account: "01071459342",
      kakao: "https://qr.kakaopay.com/Ej7l032cB",
    },
  ],
};

export default function AccountSection() {
  const [selected, setSelected] = useState<"groom" | "bride">("bride");
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
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
          active={selected === "groom"}
          onClick={() => setSelected("groom")}
        >
          신랑측
        </TabButton>
        <TabButton
          active={selected === "bride"}
          onClick={() => setSelected("bride")}
        >
          신부측
        </TabButton>
      </Tabs>

      <AccountCard>
        {accounts[selected].map(({ name, bank, account, kakao }) => (
          <AccountRow key={name + account}>
            <div>
              {name} ({bank}) {account}
            </div>
            <button onClick={() => handleCopy(account)}>복사</button>
            {kakao && (
              <KakaoPay href={kakao} target="_blank">
                <img
                  src="https://t1.daumcdn.net/kakaopay/icons/web/32-brand.png"
                  alt="kakaopay"
                  width={20}
                  height={20}
                />
              </KakaoPay>
            )}
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
