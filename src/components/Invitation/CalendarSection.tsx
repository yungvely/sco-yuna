"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
const Wrapper = styled.section`
  position: relative;
  padding: 60px 24px;
  text-align: center;

  background: linear-gradient(to bottom, white 0%, #fffcee 100%);
  border-bottom-right-radius: 140px;

  &::before {
    content: "";
    background-color: #fffcee;
    position: absolute;
    top: 100%;
    left: 0;
    width: 140px;
    height: 140px;
  }

  &::after {
    content: "";
    background-color: #fff;
    position: absolute;
    top: 100%;
    left: 0;
    width: 140px;
    height: 140px;
    border-top-left-radius: 140px;
  }
`;

const DateText = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 8px;
`;

const SubText = styled.p`
  color: #999;
  font-size: 0.95rem;
  margin-bottom: 8px;

  & + & {
    margin-bottom: 32px;
  }
`;

const Calendar = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  text-align: center;
  max-width: 320px;
  margin: 0 auto 24px;
`;

const Day = styled.div<{ $active?: boolean; $red?: boolean }>`
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 0.95rem;
  line-height: 1;
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
  background: ${({ $active }) =>
    $active ? "linear-gradient(135deg, #c9a176, #b56b43)" : "transparent"};
  color: ${({ $active, $red }) =>
    $active ? "#fff" : $red ? "#d9534f" : "#333"};
  box-shadow: ${({ $active }) =>
    $active ? "0 2px 5px rgba(0,0,0,0.15)" : "none"};
  transition: all 0.3s ease;
`;

const DdayWrap = styled.div`
  margin-top: 32px;
`;

const Countdown = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 8px;
  font-family: "Gowun Batang", serif;
  margin-bottom: 8px;
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Label = styled.span`
  font-size: 0.65rem;
  color: #b79b7b;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
`;

const Value = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #5b4433;
  line-height: 1;
`;

const Colon = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  line-height: 1;
  align-self: flex-end;
  padding: 0 4px;
`;

const Subtitle = styled.p`
  color: #5b4433;
  margin-top: 20px;
`;

const Days = styled.span`
  color: #b56b43;
  font-weight: bold;
  margin: 0 4px;
`;

const CalendarSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false,
  });

  const weddingDate = new Date("2025-08-23T12:30:00+09:00");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      const diff = Math.max(weddingDate.getTime() - now.getTime(), 0);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      const expired = now >= weddingDate; // ✅ 수정: 12:30 이후 true

      setTimeLeft({ days, hours, minutes, seconds, expired });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const now = new Date();

  const weddingDayStart = new Date("2025-08-23T00:00:00+09:00");
  const weddingDayEnd = new Date("2025-08-24T00:00:00+09:00");
  const isDday = now >= weddingDayStart && now < weddingDayEnd;

  const displayDay = isDday
    ? "D-DAY❤️"
    : timeLeft.days +
      (timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0
        ? 1
        : 0);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <Wrapper>
        <DateText>2025.08.23</DateText>
        <SubText>토요일 낮 12시 30분</SubText>
        <SubText>Saturday, August 23, 2025 | PM 12:30</SubText>
        <Calendar>
          {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
            <Day key={day} $red={day === "일"}>
              {day}
            </Day>
          ))}
          {Array.from({ length: 42 }, (_, i) => {
            const date = i - 4;
            const isVisible = i > 4 && i < 36;
            const isSunday = i % 7 === 0;
            const isFifteenth = date === 15;
            return (
              <Day key={i} $active={date === 23} $red={isSunday || isFifteenth}>
                {isVisible ? date : ""}
              </Day>
            );
          })}
        </Calendar>
        <DdayWrap>
          {isDday || !timeLeft.expired ? (
            <>
              {!timeLeft.expired && (
                <Countdown>
                  <Block>
                    <Label>Days</Label>
                    <Value>{timeLeft.days}</Value>
                  </Block>
                  <Colon>:</Colon>
                  <Block>
                    <Label>Hour</Label>
                    <Value>{timeLeft.hours}</Value>
                  </Block>
                  <Colon>:</Colon>
                  <Block>
                    <Label>Min</Label>
                    <Value>{timeLeft.minutes}</Value>
                  </Block>
                  <Colon>:</Colon>
                  <Block>
                    <Label>Sec</Label>
                    <Value>{timeLeft.seconds}</Value>
                  </Block>
                </Countdown>
              )}

              <Subtitle>
                석호, 윤아의 결혼식이
                <Days>{displayDay}</Days>
                {typeof displayDay === "string" ? " 입니다." : "일 남았습니다."}
              </Subtitle>
            </>
          ) : (
            <Subtitle>
              많은 축복 속에 결혼식을 무사히 마쳤습니다.
              <br />
              함께해 주신 모든 분들께 진심으로 감사드립니다.
            </Subtitle>
          )}
        </DdayWrap>
      </Wrapper>
    </motion.div>
  );
};

export default CalendarSection;
