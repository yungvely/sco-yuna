"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import { HandwritingText } from "../common/HandwritingText";

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  max-height: 600px;
  max-width: 100%;
  aspect-ratio: 430 / 600;
  margin: 0 auto 20px;
  padding: 0 24px;

  overflow: hidden;
`;
const Text = styled.div`
  position: absolute;
  top: 0;
`;
const BackgroundImage = styled.div<{ src: string }>`
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
`;

const WritingHeader = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <Wrapper>
        <BackgroundImage
          src={
            "https://prodmsamedia.mymusictaste.com/cshopproject/images/f1031cb8377b11efa4190a58a9feac02.jpeg"
          }
        />
        <Text>
          <HandwritingText
            text={`Seok Ho & Yun A\n2025. 8. 23 \nTest`}
            fontUrls={["/fonts/HetigonVintage.otf", "/fonts/WayCome.otf"]}
            fontSizes={[55, 55, 50]}
            strokeColors={["#000", "#E91E63", "#3F51B5"]}
            fillColors={["#000", "#E91E63", "#3F51B5"]}
            lineHeights={[1.5, 1.2, 1.1]} // 각 줄마다 다르게!
            lineDelays={[200, 300, 500]}
            onComplete={() => {
              console.log("🎉 All handwriting animation complete");
            }}
          />

          {/* 
          Migrand.otf
          DarhoutyFrederics.otf
            HetigonVintage.otf
            Mitchell.otf
            WayCome.otf
            KingRimba.ttf
            */}
        </Text>
      </Wrapper>
    </motion.div>
  );
};

export default WritingHeader;
