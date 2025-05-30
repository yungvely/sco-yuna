"use client";

import BackgroundMusic from "@/components/Invitation/BackgroundMusic";
import RSVPForm from "@/components/RSVP/RSVPForm";
import RSVPPopup from "@/components/RSVP/RSVPPopup";
import { getAssetUrl } from "@/lib/getAssetUrl";
import { useEffect, useRef, useState } from "react";
import ArchHero from "./ArchHero";
import { FontSizeControl } from "./common/FontSizeController";
import { FlowerCanvas } from "./FlowerCanvas";
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
  variant?: "yuna" | "sco";
};

const Invitation = ({ variant }: Props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const section1Ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const hidden = localStorage.getItem("rsvp_hidden_date");
    const today = new Date().toISOString().split("T")[0];
    if (hidden !== today) {
      setShowPopup(true);
    }
  }, []);

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

      <GreetingSection variant={variant ? "yunasco" : "modern"} />
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
          {/* <AccountSection /> */}
          <FontSizeControl />
        </>
      )}
      <BackgroundMusic />
      <RSVPSection onClick={() => setShowForm(true)} />
      <ShareSection variant={variant} />
      {showPopup && (
        <RSVPPopup
          onClose={() => setShowPopup(false)}
          onSubmit={() => {
            setShowPopup(false);
            setShowForm(true);
          }}
          onSkipToday={handleSkipToday}
        />
      )}
      {showForm && <RSVPForm onClose={() => setShowForm(false)} />}
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
