"use client";

import BackgroundMusic from "@/components/Invitation/BackgroundMusic";
import RSVPForm from "@/components/RSVP/RSVPForm";
import RSVPPopup from "@/components/RSVP/RSVPPopup";
import { getAssetUrl } from "@/lib/getAssetUrl";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FontSizeControl } from "./common/FontSizeController";
import Typography from "./common/Typography";
import ArchHero from "./Header/ArchHero";
import { FlowerCanvas } from "./Header/FlowerCanvas";
import AccountSection from "./Invitation/AccountSection";
import CalendarSection from "./Invitation/CalendarSection";
import { GallerySection } from "./Invitation/Gallery";
import { GalleryTabs } from "./Invitation/GalleryTabs";
import GreetingSection from "./Invitation/GreetingSection";
import InformationSection from "./Invitation/InformationSection";
import LocationSection from "./Invitation/LocationSection";
import RSVPSection from "./Invitation/RSVPSection";
import ShareSection from "./Invitation/ShareSection";

type Props = {
  variant: "yuna" | "sco" | null;
  openingEnd: boolean;
};

const Copyright = styled.div`
  margin-bottom: 20px;
`;
const Invitation = ({ variant, openingEnd }: Props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showForm, setShowForm] = useState(false);
  // const [showContact, setShowContact] = useState(false);

  const section1Ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (openingEnd) return setShowPopup(false);
    const hidden = localStorage.getItem("rsvp_hidden_date");
    const today = new Date().toISOString().split("T")[0];
    if (hidden !== today) {
      setShowPopup(true);
    }
  }, [openingEnd]);

  const handleSkipToday = () => {
    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem("rsvp_hidden_date", today);
    setShowPopup(false);
  };

  return (
    <>
      {/* <FlowerCanvas
        sectionRef={section1Ref}
        //variant="blossom"
      /> */}
      <ArchHero ref={section1Ref} imageSrc={getAssetUrl("first.gif")}>
        <FlowerCanvas sectionRef={section1Ref} />
      </ArchHero>

      <GreetingSection variant={variant ? variant : "modern"} />
      {variant ? (
        variant === "yuna" ? (
          <YunaVersion />
        ) : (
          <ScoVersion />
        )
      ) : (
        <>
          <CalendarSection />
          <GallerySection />
          <LocationSection />
          <InformationSection />
          <AccountSection />
          <FontSizeControl />
        </>
      )}
      <BackgroundMusic />
      <RSVPSection onClick={() => setShowForm(true)} />
      <ShareSection variant={variant} />
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
            setTimeout(() => {
              setShowForm(true);
            }, 250); // CommonPopup 애니메이션 300ms보다 살짝 여유
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

const YunaVersion = () => (
  <>
    <CalendarSection />
    <GalleryTabs />
    <LocationSection />
    <InformationSection />
    <AccountSection />
  </>
);

const ScoVersion = () => (
  <>
    <CalendarSection />
    {/* <LocationSection /> */}
    <InformationSection />
    <AccountSection />
  </>
);

export default Invitation;
