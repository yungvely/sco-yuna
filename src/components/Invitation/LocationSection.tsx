"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";

const Wrapper = styled.section`
  position: relative;
  padding: 60px 24px;
  text-align: center;
`;

const Title = styled.h3`
  font-size: 16px;
  color: #d17f45;
  margin-bottom: 12px;
  letter-spacing: 1px;
`;

const Heading = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 16px;
`;

const Address = styled.p`
  font-size: 0.875rem;
  color: #555;
  margin-bottom: 4px;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  margin: 24px auto;
  max-width: 360px;
  border: 1px solid #ccc;
`;

const NavLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 12px;
`;

const NavButton = styled.button`
  font-size: 13px;
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
  color: #333;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Directions = styled.div`
  margin-top: 32px;
  text-align: left;
  font-size: 0.875rem;
  line-height: 1.8;
  color: #333;
  max-width: 360px;
  margin-left: auto;
  margin-right: auto;
`;

const Label = styled.span<{ color?: string }>`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ color }) => color || "#000"};
  margin-right: 6px;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const Modal = styled.div`
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  text-align: center;
  max-width: 300px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
`;

const ModalText = styled.p`
  font-size: 0.875rem;
  color: #333;
  margin-bottom: 16px;
`;

const ModalButton = styled.button`
  padding: 8px 16px;
  background: #e6e0dd;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  cursor: pointer;
`;

const MapIcon = styled.img<{ size?: string }>`
  width: ${({ size }) => size || "20"}px;
  margin-right: 6px;
`;

const LocationSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const mapRef = useRef<HTMLDivElement>(null);
  const [modalVisible, setModalVisible] = useState<
    null | "naver" | "tmap" | "kakao"
  >(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof window.naver !== "undefined" &&
      typeof window.naver.maps !== "undefined" &&
      mapRef.current
    ) {
      const location = new window.naver.maps.LatLng(
        37.50436945715146,
        127.04997438696505
      );
      const map = new window.naver.maps.Map(mapRef.current, {
        center: location,
        zoom: 17,
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: window.naver.maps.MapTypeControlStyle.BUTTON,
          position: window.naver.maps.Position.TOP_RIGHT,
        },
      });
      new window.naver.maps.Marker({
        position: location,
        map,
      });
    }
  }, []);

  const handleAppRedirect = () => {
    if (!modalVisible) return;

    const lat = 37.50436945715146;
    const lng = 127.04997438696505;
    const place = "르비르모어 2F 클리타홀";
    const isMobile = /iPhone|Android/i.test(navigator.userAgent);

    if (!isMobile && modalVisible === "naver") {
      window.open(
        `https://map.naver.com/p/directions/-/${lng},${lat},${encodeURIComponent(
          place
        )},,/-/car`,
        "_blank"
      );
    } else {
      const schemes = {
        naver: `nmap://place?name=${encodeURIComponent(
          place
        )}&lat=${lat}&lng=${lng}&appname=com.example.weddinginvite`,
        tmap: `tmap://route?goalname=${encodeURIComponent(
          place
        )}&goalx=${lng}&goaly=${lat}`,
        kakao: `kakaonavi://navigate?dest_lat=${lat}&dest_lng=${lng}&dest_name=${encodeURIComponent(
          place
        )}`,
      };
      window.location.href = schemes[modalVisible];
    }
    setModalVisible(null);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <Wrapper>
        <Title>LOCATION</Title>
        <Heading>오시는 길</Heading>
        <Address>르비르모어 2F 클리타홀</Address>
        <Address>서울 강남구 테헤란로 406</Address>
        <Address>Tel. 02-501-7000</Address>

        <MapContainer ref={mapRef} />

        <NavLinks>
          <NavButton onClick={() => setModalVisible("naver")}>
            <MapIcon
              src="https://ditto-phinf.pstatic.net/20250403_62/1743664218329EDdUx_PNG/67ee345a33d4b137e96c1b58.png"
              alt=""
            />
            네이버지도
          </NavButton>
          <NavButton onClick={() => setModalVisible("tmap")}>
            <MapIcon
              size="12"
              src="https://www.tmapmobility.com/favicon.ico"
              alt=""
            />
            티맵
          </NavButton>
          <NavButton onClick={() => setModalVisible("kakao")}>
            <MapIcon
              size="18"
              src="https://t1.kakaocdn.net/kakaomobility/company_website/contents/v2/12-icon-navi.svg"
              alt=""
            />
            카카오내비
          </NavButton>
        </NavLinks>

        <Directions>
          <strong>내비게이션</strong>
          <br />
          원하는 앱을 선택하시면 길안내가 시작됩니다.
          <br />
          <br />
          <strong>지하철</strong>
          <br />
          <Label color="#3b9f37" /> 2호선 <Label color="#dba829" /> 수인분당선
          선릉역 1번 출구 바로 앞
          <br />
          <br />
          <strong>버스</strong>
          <br />
          선릉역 하차
          <br />
          <Label color="#3165a8" /> 간선 146, 333, 341, 360, 740
          <br />
          <Label color="#c82363" /> 광역 1100, 1700, 2000, 7007, 8001, 9303
          <br />
          진선여자중고등학교 하차
          <br />
          <Label color="#3165a8" /> 간선 472
          <br />
          <Label color="#3b9f37" /> 지선 3414, 3426, 4312
          <br />
          <br />
          <strong>주차 안내</strong>
          <br />
          입차 시 발렛파킹 (2시간 무료)
          <br />
          출차 시 1층 정문에서 키 받고 지하주차장 직접 출차
        </Directions>

        {modalVisible && (
          <ModalBackdrop>
            <Modal>
              <ModalText>
                앱이 설치되어 있지 않은 경우 길 안내가 실행되지 않을 수
                있습니다.
              </ModalText>
              <ModalButton onClick={handleAppRedirect}>확인</ModalButton>
            </Modal>
          </ModalBackdrop>
        )}
      </Wrapper>
    </motion.div>
  );
};

export default LocationSection;
