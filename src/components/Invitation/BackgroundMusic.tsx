"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const AudioButton = styled.button`
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 9999;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 9999px;
  padding: 0.5rem;
  cursor: pointer;
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
    <>
      <audio
        ref={audioRef}
        src="https://cdn.pixabay.com/audio/2021/12/23/audio_0056baaaa9.mp3"
        autoPlay
        loop
      />
      <AudioButton onClick={toggleMute} aria-label="음악 음소거 토글">
        {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </AudioButton>
    </>
  );
};

export default BackgroundMusic;
