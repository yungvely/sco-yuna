"use client";

import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const MotionWrapper = styled(motion.div)`
  position: fixed;
  top: 16px;
  right: 50%;
  transform: translateX(calc(212.5px - 16px)); // (425 / 2 - 16px)
  z-index: 998;

  @media (max-width: 425px) {
    left: auto;
    right: 16px;
    transform: none;
  }
`;

const ExpandableButton = styled.button<{ expanded: boolean }>`
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  background: rgba(255, 215, 51, 0.4);
  border-radius: 999px;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  gap: ${({ expanded }) => (expanded ? "8px" : "0")};
  padding: 8px;
  transform-origin: right;
  transition: all 0.4s linear;
  font-size: 14px;

  ${({ expanded }) =>
    expanded &&
    `
    padding-left: 16px;
    padding-right: 12px;
  `}

  span {
    display: inline-block;
    max-width: ${({ expanded }) => (expanded ? "200px" : "0")};
    opacity: ${({ expanded }) => (expanded ? 1 : 0)};
    transform: ${({ expanded }) => (expanded ? "scaleX(1)" : "scaleX(0)")};
    font-weight: bold;
    transform-origin: left;
    transition: all 0.4s linear;
    color: #b56b43;
    text-shadow: 0 1px 2px rgba(255, 255, 255, 0.4);
    white-space: nowrap;
  }

  svg {
    flex-shrink: 0;
    font-size: 14px;
    color: #fff;
  }
`;

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.muted = false;
      audio.play().then(() => {
        setPlaying(true);
        setMuted(false);
      });
    }
  };

  useEffect(() => {
    setVisible(true); // 등장 트리거
    const expandTimer = setTimeout(() => setExpanded(true), 200);
    const shrinkTimer = setTimeout(() => setExpanded(false), 2500);
    return () => {
      clearTimeout(expandTimer);
      clearTimeout(shrinkTimer);
    };
  }, []);

  useEffect(() => {
    const handleVisibility = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (document.hidden) {
        audio.pause();
      } else if (playing) {
        audio.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, [playing]);

  return (
    <>
      <audio
        ref={audioRef}
        src="https://cdn.pixabay.com/audio/2021/12/23/audio_0056baaaa9.mp3"
        loop
        muted
        style={{ display: "none" }}
      />
      {visible && (
        <MotionWrapper
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <ExpandableButton onClick={togglePlay} expanded={expanded}>
            <span>배경음악이 준비되어 있습니다.</span>
            {playing ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </ExpandableButton>
        </MotionWrapper>
      )}
    </>
  );
};

export default BackgroundMusic;
