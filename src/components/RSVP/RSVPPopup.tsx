"use client";

import { CommonPopup } from "@/components/common/Popup";
import { Badge, BadgeCheck } from "lucide-react";
import { useState } from "react";
import styled from "styled-components";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onSkipToday: () => void;
};

const Highlight = styled.div`
  margin: 16px 0;
  font-weight: bold;
`;

const BottomButtons = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SkipButton = styled.button<{ checked: boolean }>`
  background: none;
  color: ${({ checked }) => (checked ? "#b56b43" : "#555")};
  font-size: 0.9rem;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    margin-right: 6px;
  }
`;

const RSVPPopup = ({ isOpen, onClose, onSubmit, onSkipToday }: Props) => {
  const [checked, setChecked] = useState(false);

  const handleClose = () => {
    if (checked) onSkipToday();
    onClose();
  };
  const handleToggle = () => setChecked((prev) => !prev);

  return (
    <CommonPopup
      isOpen={isOpen}
      onClose={handleClose}
      onConfirm={onSubmit}
      confirmText="참석 의사 전달하기"
      cancelText="닫기"
    >
      <h2 style={{ textAlign: "center" }}>참석 의사 전달</h2>
      <br />
      <p style={{ textAlign: "center" }}>
        참석의 부담은 가지지 말아주시고,
        <br />
        정성껕 준비하기 위해 여쭙는 것이니,
        <br />
        참석정보를 알려주시면 감사하겠습니다.
      </p>
      <Highlight style={{ textAlign: "center" }}>
        신랑 한석호 & 신부 안윤아
      </Highlight>
      <div style={{ textAlign: "center" }}>
        2025년 08월 23일 토요일, 낮 12시 30분
      </div>
      <div style={{ textAlign: "center" }}>르비르모어 2F 클리타홀</div>

      <BottomButtons>
        <SkipButton onClick={handleToggle} checked={checked}>
          {checked ? <BadgeCheck size={18} /> : <Badge size={18} />}
          오늘 하루 보지 않기
        </SkipButton>
      </BottomButtons>
    </CommonPopup>
  );
};

export default RSVPPopup;
