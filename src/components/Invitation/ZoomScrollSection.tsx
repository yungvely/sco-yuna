// src/components/Invitation/ZoomScrollSection.tsx
"use client";

import { motion } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";
// useInView는 초기 컴포넌트 등장 애니메이션 용도로만 남겨두고, 스크롤 애니메이션에 직접 사용하지 않습니다.
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import { getAssetUrl } from "../../lib/getAssetUrl";
import Typography from "../common/Typography";

const SECTION_VISUAL_HEIGHT = "450px"; // 스크롤 섹션이 차지할 뷰포트 높이

const Wrapper = styled.section`
  position: relative;
  height: ${SECTION_VISUAL_HEIGHT};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden; /* 내부 콘텐츠가 밖으로 나가지 않도록 */
  background-color: #fff;
`;

const InnerContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 425px; /* 모바일 최대 너비 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// Section1: 스크롤하면 사라지고 확대됨
const Section1 = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: 0.7s opacity cubic-bezier(0.4, 0, 1, 1);
  //   will-change: transform, opacity;
`;

// Section2: 스크롤하면 나타남
const Section2 = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: transparent;
  transition: 0.7s opacity cubic-bezier(0.4, 0, 1, 1);
`;

// 전체 그리드 컨테이너가 정사각형 (1:1)이 되도록 설정
const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 3fr); /* 2열 */
  gap: 8px;
  width: 90%;
  max-width: 360px;
  aspect-ratio: 1 / 1; /* <--- 300x300 정사각형처럼 전체 그리드 컨테이너를 1:1 비율로 만듦 */
  transform-origin: center center;
  will-change: transform;
`;

// 각 아이템은 그리드 레이아웃에 의해 크기가 결정됩니다.
const GridItem = styled.div`
  width: 100%;
  height: auto; /* <--- height: 100px 대신 auto로 변경 */
  /* 각 아이템의 높이는 그리드 레이아웃이 자동으로 계산합니다. */
  /* 필요하다면 min-height 등을 설정할 수 있습니다. */
  overflow: hidden;
  border-radius: 68px;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const MainHeading = styled(motion.h2)`
  color: white; /* Section1 배경이 검정이므로 */
  //   text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  text-shadow: 1px 1px 0 #bfa25a, 2px 2px 0 #bfa25a, 3px 3px 0 #bfa25a,
    4px 4px 0 #bfa25a, 5px 5px 0 #bfa25a, 6px 6px 0 #bfa25a;
  margin-bottom: 20px;
  position: absolute; /* 이미지와 겹치도록 */
  z-index: 10; /* 이미지 위에 오도록 */
  pointer-events: none; /* 텍스트 아래 클릭되도록 */
  white-space: nowrap; /* 줄바꿈 방지 */
`;

const SubHeading = styled(motion.p)`
  color: white; /* Section1 배경이 검정이므로 */
  //   text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  text-shadow: 1px 1px 0 #bfa25a, 2px 2px 0 #bfa25a, 3px 3px 0 #bfa25a,
    4px 4px 0 #bfa25a, 5px 5px 0 #bfa25a, 6px 6px 0 #bfa25a;
  text-align: center;
  position: absolute; /* 이미지와 겹치도록 */
  z-index: 10; /* 이미지 위에 오도록 */
  top: calc(50% + 40px); /* MainHeading 아래에 위치 */
  pointer-events: none;
  white-space: nowrap; /* 줄바꿈 방지 */
`;

const ZoomScrollSection = () => {
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  }); // 초기 진입 애니메이션용
  const sectionRef = useRef<HTMLDivElement>(null); // 전체 Wrapper 참조
  const [scrollProgress, setScrollProgress] = useState(0); // 0 (섹션 진입 시) ~ 1 (애니메이션 종료 시)

  const imgs = [
    getAssetUrl("yuna/scroll_01.webp"), // 실제 이미지 경로로 교체
    getAssetUrl("yuna/scroll_02.webp"),
    getAssetUrl("yuna/scroll_03.webp"),
    getAssetUrl("yuna/scroll_04.webp"),
    getAssetUrl("yuna/scroll_05.webp"),
    getAssetUrl("yuna/scroll_06.webp"),
  ];

  const illust = [
    getAssetUrl("yuna/illu_01.webp"), // 실제 이미지 경로로 교체
    getAssetUrl("yuna/illu_02.webp"),
    getAssetUrl("yuna/illu_03.webp"),
    getAssetUrl("yuna/illu_04.webp"),
    getAssetUrl("yuna/illu_05.webp"),
    getAssetUrl("yuna/illu_06.webp"),
  ];

  const handleScroll = useCallback(() => {
    if (sectionRef.current) {
      const sectionTop = sectionRef.current.offsetTop;
      const sectionH = sectionRef.current.getBoundingClientRect().height;
      const scrollY = window.scrollY;

      // 섹션이 뷰포트 중간에 왔을 때 스티키 효과 시작 (Codepen과 유사)
      const startScrollOffset = sectionTop - sectionH / 2;
      // 스크롤 애니메이션이 완료될 스크롤 지점
      const animationEndScroll = startScrollOffset + 1500;

      let progress = 0;
      if (scrollY < startScrollOffset) {
        progress = 0; // 애니메이션 시작 전
      } else if (
        scrollY >= startScrollOffset &&
        scrollY <= animationEndScroll
      ) {
        // 애니메이션 진행 중
        progress = scrollY - startScrollOffset;
      } else {
        progress = 1; // 애니메이션 종료 후
      }

      setScrollProgress(Math.min(1, Math.max(0, progress))); // 0~1 범위로 클램핑
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 마운트 시 초기 위치 설정

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // 스크롤 진행률에 따른 애니메이션 값
  // Section1: 확대되면서 사라짐 (0 -> 1 진행률)
  const section1Opacity = 1 - scrollProgress; // 1 -> 0으로 투명해짐

  // Section2: 나타나면서 확대됨 (0 -> 1 진행률)
  // 예를 들어, scrollProgress가 0.5가 되었을 때 Section2가 나타나기 시작한다면:
  const section2AdjustedProgress = Math.max(0, scrollProgress - 0.5) * 2; // 0.5 ~ 1 구간을 0 ~ 1로 매핑
  const section2Opacity = section2AdjustedProgress; // 0 -> 1로 투명해짐

  return (
    <motion.div
      ref={inViewRef} // 초기 진입 애니메이션용 ref
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <Wrapper ref={sectionRef}>
        <InnerContent>
          {/* Section 1: 초기 화면, 스크롤 시 확대되고 사라짐 */}
          <Section1
            style={{
              opacity: section1Opacity,
              zIndex: 2, // Section1이 위에 오도록
            }}
          >
            <ImageGrid>
              {imgs.map((src, index) => (
                <GridItem key={index}>
                  <StyledImage src={src} alt={`Image ${index + 1}`} />
                </GridItem>
              ))}
            </ImageGrid>
          </Section1>

          {/* Section 2: 스크롤 시 서서히 나타남 */}
          <Section2
            style={{
              opacity: section2Opacity,
              zIndex: 1, // Section2가 Section1 아래에 있다가 위에 오도록 (transition)
            }}
          >
            {/* Section2에 들어갈 이미지 (예시로 동일 이미지 사용) */}
            <ImageGrid>
              {illust.map((src, index) => (
                <GridItem key={`s2-${index}`}>
                  <StyledImage src={src} alt={`Image ${index + 1}`} />
                </GridItem>
              ))}
            </ImageGrid>
          </Section2>

          <MainHeading style={{ opacity: 1, margin: "-115px 0 0" }}>
            <Typography size={1.2} lineHeight={1.5}>
              석호 🩷 윤아
            </Typography>
          </MainHeading>
          <SubHeading style={{ opacity: 1, margin: "-70px 0 0" }}>
            <Typography
              size={2.5}
              font={1}
              lineHeight={1.8}
              letterSpacing={4}
              center
            >
              Together with you,
              <br /> It’s Perfect.
            </Typography>
          </SubHeading>
        </InnerContent>
      </Wrapper>
    </motion.div>
  );
};

export default ZoomScrollSection;
