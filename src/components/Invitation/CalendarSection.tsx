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
  border-bottom-right-radius: 15vw;

  &:before {
    content: "";
    background-color: #fffcee;
    position: absolute;
    top: 100%;
    left: 0;
    width: 15vw;
    height: 15vw;
  }
  &:after {
    content: "";
    background-color: #fff;
    position: absolute;
    top: 100%;
    left: 0;
    width: 15vw;
    height: 15vw;
    border-top-left-radius: 15vw;
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
  padding: 6px;
  border-radius: 50%;
  background: ${({ $active }) => ($active ? "#b56b43" : "transparent")};
  color: ${({ $active, $red }) =>
    $active ? "#fff" : $red ? "#d9534f" : "#333"};
`;

const DdayWrap = styled.div`
  margin-top: 32px;
`;

const Countdown = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
  gap: 8px;
  font-family: "Gowun Batang", serif;
`;

const Block = styled.div`
  text-align: center;
`;

const Label = styled.div`
  font-size: 0.75rem;
  color: #888;
  margin-bottom: 4px;
`;

const Value = styled.span`
  font-size: 1.5rem;
  padding: 4px 10px;
  background: #fff;
  border-radius: 4px;
`;

const Colon = styled.div`
  font-size: 1.5rem;
  padding: 0 4px;
`;

const Subtitle = styled.p`
  margin-top: 16px;
  font-weight: bold;
  color: #333;
`;

const Days = styled.span`
  color: #964b00;
  font-weight: bold;
  vertical-align: middle;
  margin: 0 4px;
`;

const CalendarSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const weddingDate = new Date("2025-08-23T12:30:00+09:00");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = weddingDate.getTime() - now.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const today = new Date();
  const isDday =
    today.getFullYear() === weddingDate.getFullYear() &&
    today.getMonth() === weddingDate.getMonth() &&
    today.getDate() === weddingDate.getDate();

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

          <Subtitle>
            석호, 윤아의 결혼식이<Days>{displayDay}</Days>
            {typeof displayDay === "string" ? " 입니다." : "일 남았습니다."}
          </Subtitle>
        </DdayWrap>
      </Wrapper>
    </motion.div>
  );
};

export default CalendarSection;
