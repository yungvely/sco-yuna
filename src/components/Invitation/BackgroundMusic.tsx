"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FixedWrapper } from "../../styles/common";

const AudioButton = styled.button`
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 999;
  background: rgba(255, 215, 51, 0.4);
  color: rgb(255 255 255 / 90%);
  border: none;
  border-radius: 50%;
  padding: 0.5rem;
  cursor: pointer;
  font-size: 0;
`;

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const tryPlay = () => {
        audio.play().catch(() => {});
        document.removeEventListener("click", tryPlay);
      };
      document.addEventListener("click", tryPlay);
    }
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = !audio.muted;
      setMuted(audio.muted);
    }
  };

  return (
    <FixedWrapper>
      <audio
        ref={audioRef}
        src="https://cdn.pixabay.com/audio/2021/12/23/audio_0056baaaa9.mp3"
        autoPlay
        loop
      />
      <AudioButton onClick={toggleMute} aria-label="음악 음소거 토글">
        {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </AudioButton>
    </FixedWrapper>
  );
};

export default BackgroundMusic;
