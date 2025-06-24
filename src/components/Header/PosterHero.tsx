import Image from "next/image";
import styled from "styled-components";
import { getAssetUrl } from "../../lib/getAssetUrl";
import Typography from "../common/Typography";
import WaveEffect from "./WaveEffect";

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  max-width: 430px;
  margin: 0 auto;
  aspect-ratio: 430 / 600;
  overflow: hidden;
`;

const BackgroundImage = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 32px 16px;
  text-align: center;
  &:after {
    position: relative;
    width: calc(100% + 32px);
    background: linear-gradient(to top, #ffffff, transparent);
    height: 28px;
    bottom: -32px;
    content: "";
  }
`;

const Shadow = styled.span<{ $black?: boolean }>`
  text-shadow: ${({ $black }) =>
    $black
      ? `1px 1px 3px #000, 1px 1px 12px #000`
      : `1px 1px 0 #bfa25a, 2px 2px 0 #bfa25a, 3px 3px 0 #bfa25a,
      4px 4px 0 #bfa25a, 5px 5px 0 #bfa25a, 6px 6px 0 #bfa25a`};

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const Divider = styled.div`
  margin: 16px 0 8px;
  width: 100%;
  height: 1px;
  background: #fff;
  opacity: 0.5;
`;

const PosterHero = () => {
  return (
    <Wrapper>
      <BackgroundImage
        src={getAssetUrl("yuna/poster.webp")}
        alt="Yuna Hero"
        fill
        priority
        unoptimized
      />
      <Content>
        <br />
        <br />
        <Typography size={3.2} font={1} color="#fff" lineHeight={1.2} center>
          <Shadow>
            Happy <br />
            Wedding
            <br />
            Day
          </Shadow>
        </Typography>
        <br />
        <br />
        <Typography size={1} color="#fff" lineHeight={1.6}>
          <Shadow $black>
            한석호 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Typography size={0.9} color="#fff" lineHeight={1}>
              2025.08.28
            </Typography>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 안윤아
          </Shadow>
          <Divider />
        </Typography>
      </Content>
      <WaveEffect />
    </Wrapper>
  );
};

export default PosterHero;
