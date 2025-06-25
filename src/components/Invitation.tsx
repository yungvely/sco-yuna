"use client";

import RSVPForm from "@/components/RSVP/RSVPForm";
import RSVPPopup from "@/components/RSVP/RSVPPopup";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Typography from "./common/Typography";
import AccountSection from "./Invitation/AccountSection";
import CalendarSection from "./Invitation/CalendarSection";
import { GallerySection } from "./Invitation/Gallery";
import GreetingSection from "./Invitation/GreetingSection";
import InformationSection from "./Invitation/InformationSection";
import LastSection from "./Invitation/LastSection";
import LocationSection from "./Invitation/LocationSection";
import MainVisualSection from "./Invitation/MainVisualSection";
import RSVPSection from "./Invitation/RSVPSection";
import ShareSection from "./Invitation/ShareSection";
import ZoomScrollSection from "./Invitation/ZoomScrollSection";

type Props = {
  variant: "yuna" | "sco" | null;
  openingEnd: boolean;
  nickname?: string | null;
};

const Copyright = styled.div`
  margin-bottom: 20px;
`;

const Invitation = ({ variant, openingEnd, nickname }: Props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!openingEnd) return;
    if (openingEnd) return setShowPopup(false);
    const hidden = localStorage.getItem("rsvp_hidden_date");
    const today = new Date().toISOString().split("T")[0];
    if (hidden !== today) {
      setShowPopup((prev) => prev || true);
    }
  }, [openingEnd]);

  const handleSkipToday = () => {
    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem("rsvp_hidden_date", today);
    setShowPopup(false);
  };

  useEffect(() => {
    const url = new URL(window.location.href);

    // 공유가 아닌 직접 접근이라면 강제 리디렉션
    if (url.pathname === "/yuna" && url.searchParams.get("via") !== "kakao") {
      window.location.replace("/");
      return;
    }

    // 공유로 들어온 경우엔 주소만 조용히 변경 (replaceState)
    if (url.pathname === "/yuna" && url.searchParams.get("via") === "kakao") {
      const name = url.searchParams.get("name");
      const via = url.searchParams.get("via");

      const currentState = { name, via, originalPath: url.pathname };

      const newUrl = `${window.location.origin}/`;

      // state 객체와 함께 히스토리를 교체합니다.
      window.history.replaceState(currentState, "", newUrl);
    }
  }, []);

  useEffect(() => {
    if (variant === "yuna") {
      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        event.preventDefault();
        event.returnValue = "";
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [variant]);

  return (
    <>
      <MainVisualSection variant={variant} />
      <GreetingSection
        variant={variant ? variant : "modern"}
        nickname={nickname}
      />
      {variant === "yuna" && <ZoomScrollSection />}
      <CalendarSection variant={variant} />
      <GallerySection variant={variant} />
      {variant === "yuna" ? (
        <>
          <InformationSection variant={variant} />
          <RSVPSection variant={variant} onClick={() => setShowForm(true)} />
          <LastSection nickname={nickname} />
        </>
      ) : (
        <>
          <LocationSection />
          <InformationSection />
          <RSVPSection onClick={() => setShowForm(true)} />
          <AccountSection variant={variant} />
          <ShareSection variant={variant} />
        </>
      )}
      <Copyright>
        <Typography as="div" center size={0.75}>
          Copyright © 2025 yungvely All right reserved.
        </Typography>
      </Copyright>
      {showPopup && (
        <RSVPPopup
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
          onSubmit={() => {
            setShowPopup(false);
            setTimeout(() => setShowForm(true), 250);
          }}
          onSkipToday={handleSkipToday}
        />
      )}
      {showForm && (
        <RSVPForm isOpen={showForm} onClose={() => setShowForm(false)} />
      )}
    </>
  );
};

export default Invitation;
