"use client";

import Invitation from "@/components/Invitation";
import Opening from "@/components/Opening";
import { useState } from "react";

export default function HomePage() {
  const [openingFinished, setOpeningFinished] = useState(false);

  return (
    <>
      {!openingFinished && <Opening onEnd={() => setOpeningFinished(true)} />}
      {openingFinished && <Invitation />}
    </>
  );
}
