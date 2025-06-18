import { getAssetUrl } from "@/lib/getAssetUrl";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const tabNames = ["studio", "wedding", "tokyo", "hanbok"];
const IMAGES_PER_PANEL = 6;

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

const TabRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  background: ${({ $active }) => ($active ? "#b37542" : "#fff")};
  color: ${({ $active }) => ($active ? "#fff" : "#444")};
  border: none;
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
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
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

const LazyImage = ({ src, onClick }: { src: string; onClick: () => void }) => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <ImgWrapper ref={ref}>
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
          onClick={onClick}
          style={{ opacity: hasLoaded ? 1 : 0 }}
        />
      )}
    </ImgWrapper>
  );
};

export const GalleryTabs = () => {
  const [tabs, setTabs] = useState<string[][]>([]);
  const [visibleCounts, setVisibleCounts] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/data/yuna.json");
      const raw: string[][] = await res.json();
      const resolved = raw.map((group) => group.map(getAssetUrl));
      setTabs(resolved);
      setVisibleCounts(resolved.map(() => IMAGES_PER_PANEL));
    };
    load();
  }, []);

  const handleMore = (tabIdx: number) => {
    setVisibleCounts((prev) =>
      prev.map((count, idx) =>
        idx === tabIdx ? count + IMAGES_PER_PANEL : count
      )
    );

    setTimeout(() => {
      swiperRef.current?.updateAutoHeight();
    }, 100); // 살짝 delay 주면 안정적
  };

  const globalIndex = (tabIdx: number, localIdx: number) =>
    tabs.slice(0, tabIdx).reduce((acc, g) => acc + g.length, 0) + localIdx;

  return (
    <Wrapper>
      <Title>GALLERY</Title>
      <Heading>웨딩 갤러리</Heading>

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
          ? Array.from({ length: tabNames.length }).map((_, idx) => (
              <SwiperSlide key={idx}>
                <Grid>
                  {Array.from({ length: IMAGES_PER_PANEL }).map((_, i) => (
                    <Skeleton
                      key={i}
                      style={{
                        width: "100%",
                        aspectRatio: "1 / 1",
                        borderRadius: "8px",
                      }}
                    />
                  ))}
                </Grid>
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

      <Lightbox
        open={selectedIndex !== null}
        close={() => setSelectedIndex(null)}
        index={selectedIndex || 0}
        slides={tabs.flat().map((src) => ({ src }))}
      />
    </Wrapper>
  );
};
