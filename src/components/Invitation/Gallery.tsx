import { getAssetUrl } from "@/lib/getAssetUrl";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styled from "styled-components";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  transition: all 0.5s ease;
`;

const ImgWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  position: relative;
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 8px;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 0.4s ease;
`;

const MoreButton = styled.button`
  margin-top: 24px;
  background: none;
  border: none;
  color: #444;
  cursor: pointer;
  font-size: 16px;
  padding: 8px 0;
  position: relative;

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

type LazyImageProps = {
  src: string;
  onClick: () => void;
};

const LazyImage = ({ src, onClick }: LazyImageProps) => {
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
          alt="wedding"
          onLoad={() => setHasLoaded(true)}
          onClick={onClick}
          style={{ opacity: hasLoaded ? 1 : 0 }}
        />
      )}
    </ImgWrapper>
  );
};

const SkeletonGrid = () => (
  <Grid>
    {Array.from({ length: 9 }).map((_, i) => (
      <Skeleton
        key={i}
        style={{ width: "100%", aspectRatio: "1 / 1", borderRadius: "8px" }}
      />
    ))}
  </Grid>
);

type GallerySectionProps = {
  variant?: "sco" | "yuna";
};

export const GallerySection = ({ variant }: GallerySectionProps) => {
  const [allImages, setAllImages] = useState<string[] | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [visibleImages, setVisibleImages] = useState<string[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/data/${variant ? variant : "default"}.json`);
        const json: string[] = await res.json();
        const images = json.map((path) => getAssetUrl(path));
        setAllImages(images);
        setVisibleImages(images.slice(0, 9));
      } catch (err) {
        console.error("Failed to load image list", err);
        setAllImages([]);
      }
    };
    load();
  }, [variant]);

  const handleExpand = () => {
    if (allImages) {
      setVisibleImages(allImages);
      setExpanded(true);
    }
  };

  return (
    <Wrapper>
      <Title>GALLERY</Title>
      <Heading>웨딩 갤러리</Heading>

      {allImages === null ? (
        <SkeletonGrid />
      ) : (
        <Grid>
          {visibleImages.map((src, idx) => (
            <LazyImage
              key={src}
              src={src}
              onClick={() => setSelectedIndex(idx)}
            />
          ))}
        </Grid>
      )}

      {!expanded && allImages && allImages.length > 9 && (
        <MoreButton onClick={handleExpand}>더보기</MoreButton>
      )}

      {allImages && (
        <Lightbox
          open={selectedIndex !== null}
          close={() => setSelectedIndex(null)}
          index={selectedIndex || 0}
          slides={allImages.map((src) => ({ src }))}
          animation={{ fade: 250 }}
        />
      )}
    </Wrapper>
  );
};
