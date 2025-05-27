import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const allImages = [
  "/photo/gallery/wedding_001.jpg",
  "/photo/gallery/wedding_002.jpg",
  "/photo/gallery/wedding_003.jpg",
  "/photo/gallery/wedding_004.jpg",
  "/photo/gallery/wedding_005.jpg",
  "/photo/gallery/wedding_006.jpg",
  "/photo/gallery/wedding_007.jpg",
  "/photo/gallery/wedding_008.jpg",
  "/photo/gallery/wedding_009.jpg",
  "/photo/gallery/wedding_010.jpg",
  "/photo/gallery/wedding_011.jpg",
  "/photo/gallery/wedding_012.jpg",
  "/photo/gallery/wedding_013.jpg",
  "/photo/gallery/wedding_014.jpg",
  "/photo/gallery/wedding_015.jpg",
  "/photo/gallery/wedding_016.jpg",
  "/photo/gallery/wedding_017.jpg",
  "/photo/gallery/wedding_018.jpg",
  "/photo/gallery/wedding_019.jpg",
  "/photo/gallery/wedding_020.jpg",
  "/photo/gallery/wedding_021.jpg",
  "/photo/gallery/wedding_022.jpg",
  "/photo/gallery/wedding_023.jpg",
  "/photo/gallery/wedding_024.jpg",
  "/photo/gallery/wedding_025.jpg",
  "/photo/gallery/wedding_026.jpg",
  "/photo/gallery/wedding_027.jpg",
  "/photo/gallery/wedding_028.jpg",
  "/photo/gallery/wedding_029.jpg",
  "/photo/gallery/wedding_030.jpg",
  "/photo/gallery/wedding_031.jpg",
  "/photo/gallery/wedding_032.jpg",
  "/photo/gallery/wedding_033.jpg",
  "/photo/gallery/wedding_034.jpg",
  "/photo/gallery/wedding_035.jpg",
  "/photo/gallery/wedding_036.jpg",
  "/photo/gallery/wedding_037.jpg",
];
const Wrapper = styled.section`
  padding: 80px 24px;
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  transition: all 0.5s ease;
`;

const Img = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  object-position: center;
  border-radius: 8px;
  cursor: pointer;
`;

const Skeleton = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  background: #eee;
  border-radius: 8px;
`;

const MoreButton = styled.button`
  margin-top: 24px;
  background: none;
  border: none;
  color: #444;
  cursor: pointer;
  transition: margin 0.3s ease;
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  background: none;
  color: white;
  font-size: 1.5rem;
  border: none;
  cursor: pointer;
  z-index: 1000;
`;

export default function GallerySection() {
  const [expanded, setExpanded] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [visibleImages, setVisibleImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setVisibleImages(allImages.slice(0, 9));
  }, []);

  const handleExpand = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleImages(allImages);
      setExpanded(true);
      setLoading(false);
    }, 800);
  };

  return (
    <Wrapper>
      <Title>GALLERY</Title>
      <Heading>웨딩 갤러리</Heading>
      <Grid>
        {visibleImages.map((src, idx) => (
          <Img
            key={src}
            src={src}
            alt="wedding"
            onClick={() => setSelectedIndex(idx)}
          />
        ))}
        {loading &&
          Array.from({ length: 9 }).map((_, i) => <Skeleton key={i} />)}
      </Grid>
      {!expanded && !loading && (
        <MoreButton onClick={handleExpand}>더보기 ⌄</MoreButton>
      )}

      <AnimatePresence>
        {selectedIndex !== null && (
          <ModalOverlay
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ModalContent
              as={motion.div}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <CloseButton onClick={() => setSelectedIndex(null)}>
                &times;
              </CloseButton>
              <Swiper
                modules={[Navigation, Pagination]}
                initialSlide={selectedIndex}
                spaceBetween={20}
                slidesPerView={1}
                pagination={{ clickable: true, dynamicBullets: true }}
                navigation
                loop
                style={{ width: "100%", height: "100%" }}
              >
                {allImages.map((src) => (
                  <SwiperSlide key={src}>
                    <img
                      src={src}
                      alt="popup"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        objectPosition: "center",
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </Wrapper>
  );
}
