"use client";

import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupBox = styled.div`
  position: relative;
  background: #fff;
  padding: 32px 24px;
  border-radius: 16px;
  max-width: 90%;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const Highlight = styled.div`
  margin: 16px 0;
  font-weight: bold;
`;

const BottomButtons = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ActionButton = styled.button`
  background: #000;
  color: #fff;
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const SkipButton = styled.button`
  background: none;
  color: #555;
  font-size: 0.9rem;
  border: none;
  cursor: pointer;
  text-decoration: underline;
`;

type Props = {
  onClose: () => void;
  onSubmit: () => void;
  onSkipToday: () => void;
};

const RSVPPopup = ({ onClose, onSubmit, onSkipToday }: Props) => {
  return (
    <Overlay>
      <PopupBox>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>참석 의사 전달</h2>
        <p>
          특별한 날 축하의 마음으로 참석해주시는 모든 분들을 귀하게 모시고자
          아래 버튼으로 꼭 참석여부를 전달해 주세요.
        </p>
        <Highlight>신랑 한석호 & 신부 안윤아</Highlight>
        <div>2025년 08월 23일 토요일, 낮 12시 30분</div>
        <div>르비르모어 2F 클리타홀</div>

        <BottomButtons>
          <ActionButton onClick={onSubmit}>참석 의사 전달하기</ActionButton>
          <SkipButton onClick={onSkipToday}>오늘 하루 보지 않기</SkipButton>
        </BottomButtons>
      </PopupBox>
    </Overlay>
  );
};

export default RSVPPopup;
