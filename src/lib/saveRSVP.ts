// src/lib/saveRSVP.ts
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "./firebase";

type RSVPData = {
  name: string;
  attending: "yes" | "no";
  side: "groom" | "bride";
  message?: string;
  agree: boolean;
  count?: number;
};

export const saveRSVP = async (data: RSVPData) => {
  const docRef = await addDoc(collection(db, "rsvp"), {
    ...data,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
};
