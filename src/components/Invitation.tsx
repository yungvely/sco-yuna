"use client";

import BackgroundMusic from "@/components/Invitation/BackgroundMusic";
import RSVPForm from "@/components/RSVP/RSVPForm";
import RSVPPopup from "@/components/RSVP/RSVPPopup";
import { useEffect, useState } from "react";
import CalendarSection from "./Invitation/CalendarSection";
import GreetingSection from "./Invitation/GreetingSection";
import InformationSection from "./Invitation/InformationSection";
import LocationSection from "./Invitation/LocationSection";
import RSVPSection from "./Invitation/RSVPSection";
import ShareSection from "./Invitation/ShareSection";

const Invitation = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showForm, setShowForm] = useState(false);

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
      <BackgroundMusic />
      <GreetingSection />
      <CalendarSection />
      <LocationSection />
      <InformationSection />
      <ShareSection />
      {/* <AccountSection /> */}
      <RSVPSection onClick={() => setShowForm(true)} />
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

export default Invitation;
