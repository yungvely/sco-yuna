"use client";

import { getAssetUrl } from "@/lib/getAssetUrl";
import { AnimatePresence } from "framer-motion";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { CustomLightbox } from "../common/CustomLightbox";

const tabNames = ["❤️", "🧡", "💛", "💚", "💙", "💜", "🤍", "🖤"];
const IMAGES_PER_TAB = 9; // 3줄 (3x3)

const Wrapper = styled.section`
  position: relative;
  padding: 60px 24px;
  text-align: center;
`;

const Title = styled.h3`
  color: #b37542;
  letter-spacing: 1px;
`;

const Heading = styled.h2`
  font-size: 1.5rem;
  margin: 8px 0 24px;
`;

const Description = styled.p`
  font-size: 0.95rem;
  color: #333;
  line-height: 1.7;
  margin-bottom: 24px;
`;

const TabRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-bottom: 16px;
  flex-wrap: nowrap;
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: 8px;
  color: ${({ $active }) => ($active ? "#fff" : "#444")};
  border: 1px solid ${({ $active }) => ($active ? "#ffd733" : "#fff")};
  border-radius: 20px;
  cursor: pointer;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  max-width: 425px;
  margin: 0 auto;
  width: 100%;
`;

const ImgWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  position: relative;
  overflow: hidden;
  cursor: pointer;
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  position: absolute;
  top: 0;
  left: 0;
`;

const MoreButton = styled.button`
  margin-top: 16px;
  background: none;
  border: none;
  color: #444;
  font-size: 16px;
  cursor: pointer;

  &::after {
    content: "";
    display: inline-block;
    margin: 0 0 2px 8px;
    width: 8px;
    height: 8px;
    border-left: 2px solid currentColor;
    border-bottom: 2px solid currentColor;
    transform: rotate(-45deg);
  }
`;

const SkeletonGrid = () => (
  <Grid>
    {Array.from({ length: IMAGES_PER_TAB }).map((_, i) => (
      <Skeleton
        key={i}
        style={{ width: "100%", aspectRatio: "1 / 1", borderRadius: "8px" }}
      />
    ))}
  </Grid>
);

const LazyImage = ({ src, onClick }: { src: string; onClick: () => void }) => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <ImgWrapper ref={ref} onClick={onClick}>
      {!hasLoaded && (
        <Skeleton
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "8px",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      )}
      {inView && (
        <StyledImg
          src={src}
          alt=""
          onLoad={() => setHasLoaded(true)}
          style={{ opacity: hasLoaded ? 1 : 0 }}
        />
      )}
    </ImgWrapper>
  );
};

type GallerySectionProps = {
  variant?: "yuna" | "sco" | null;
};

export const GallerySection = ({ variant = null }: GallerySectionProps) => {
  const [tabs, setTabs] = useState<string[][]>([]);
  const [visibleCounts, setVisibleCounts] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`/data/${variant || "default"}.json`);
      const data = await res.json();

      if (Array.isArray(data[0])) {
        const resolved = data.map((group: string[]) => group.map(getAssetUrl));
        setTabs(resolved);
        setVisibleCounts(resolved.map(() => IMAGES_PER_TAB));
      } else {
        const resolved = data.map(getAssetUrl);
        setTabs([resolved]);
        setVisibleCounts([IMAGES_PER_TAB]);
      }
    };
    load();
  }, [variant]);

  const closeLightbox = () => {
    if (window.history.state?.lightbox) {
      window.history.replaceState(
        window.history.state.previousState, // 열기 전 상태로 복원
        "",
        window.location.pathname
      );
    }
    setSelectedIndex(null);
  };

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (!event.state?.lightbox) {
        setSelectedIndex(null);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (selectedIndex !== null) {
      if (!window.history.state?.lightbox) {
        const currentState = window.history.state;
        window.history.pushState(
          { lightbox: true, previousState: currentState },
          ""
        );
      }

      if (tabs.length > 1) {
        const newTabIndex = findTabIndexFromGlobalIndex(selectedIndex);
        if (newTabIndex !== activeTab) {
          setActiveTab(newTabIndex);
          swiperRef.current?.slideTo(newTabIndex);
        }
      }

      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex, tabs]);

  const findTabIndexFromGlobalIndex = (globalIndex: number) => {
    if (globalIndex === null || !tabs.length) return 0;
    let cumulativeLength = 0;
    for (let i = 0; i < tabs.length; i++) {
      cumulativeLength += tabs[i].length;
      if (globalIndex < cumulativeLength) {
        return i;
      }
    }
    return tabs.length - 1;
  };

  const handleMore = (tabIdx: number) => {
    setVisibleCounts((prev) =>
      prev.map((count, idx) =>
        idx === tabIdx ? count + IMAGES_PER_TAB : count
      )
    );
    setTimeout(() => swiperRef.current?.updateAutoHeight?.(), 100);
  };

  const globalIndex = (tabIdx: number, localIdx: number) =>
    tabs.slice(0, tabIdx).reduce((acc, g) => acc + g.length, 0) + localIdx;

  return (
    <Wrapper>
      <Title>GALLERY</Title>
      {variant === "yuna" ? (
        <>
          <Heading>웨딩사진 100만장 📸</Heading>
          <Description>
            사진 자랑하고 싶어서 Self로 모청을 만든만큼 <br />
            사진이 엄청 많아!! <br />
            너니까 이렇게 자랑하는거 알지?? 👉🏻👈🏻
            <br />
            그냥 즐겁게 구경해줘 🤗
          </Description>
        </>
      ) : (
        <Heading>웨딩 갤러리</Heading>
      )}

      {tabs.length > 1 && (
        <TabRow>
          {tabNames.map((name, i) => (
            <Tab
              key={name}
              $active={i === activeTab}
              onClick={() => {
                setActiveTab(i);
                swiperRef.current?.slideTo(i);
              }}
            >
              {name}
            </Tab>
          ))}
        </TabRow>
      )}

      <Swiper
        onSwiper={(swiper: any) => (swiperRef.current = swiper)}
        onSlideChange={(swiper: { activeIndex: SetStateAction<number> }) =>
          setActiveTab(swiper.activeIndex)
        }
        slidesPerView={1}
        spaceBetween={32}
        autoHeight
        modules={[Autoplay]}
      >
        {tabs.length === 0
          ? Array.from({
              length: variant === "yuna" ? tabNames.length : 1,
            }).map((_, idx) => (
              <SwiperSlide key={idx}>
                <SkeletonGrid />
              </SwiperSlide>
            ))
          : tabs.map((images, tabIdx) => (
              <SwiperSlide key={tabIdx}>
                <Grid>
                  {images.slice(0, visibleCounts[tabIdx]).map((src, idx) => (
                    <LazyImage
                      key={src}
                      src={src}
                      onClick={() => setSelectedIndex(globalIndex(tabIdx, idx))}
                    />
                  ))}
                </Grid>
                {visibleCounts[tabIdx] < images.length && (
                  <MoreButton onClick={() => handleMore(tabIdx)}>
                    더보기
                  </MoreButton>
                )}
              </SwiperSlide>
            ))}
      </Swiper>

      <AnimatePresence
        onExitComplete={() => {
          document.body.style.overflow = "";
        }}
      >
        {selectedIndex !== null && (
          <CustomLightbox
            open={selectedIndex !== null}
            images={tabs.flat()}
            index={selectedIndex || 0}
            onClose={closeLightbox}
            onIndexChange={(newIndex) => setSelectedIndex(newIndex)}
          />
        )}
      </AnimatePresence>
    </Wrapper>
  );
};
