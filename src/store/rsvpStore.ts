import { create } from "zustand";

type RSVPState = {
  attending: "yes" | "no" | null;
  name: string;
  side: "groom" | "bride" | null;
  message: string;
  agree: boolean;
  setAttending: (value: "yes" | "no") => void;
  setName: (value: string) => void;
  setSide: (value: "groom" | "bride") => void;
  setMessage: (value: string) => void;
  setAgree: (value: boolean) => void;
  count: number;
  setCount: (value: number) => void;
};

export const useRsvpStore = create<RSVPState>((set) => ({
  attending: null,
  name: "",
  side: null,
  message: "",
  agree: false,
  setAttending: (value) => set({ attending: value }),
  setName: (value) => set({ name: value }),
  setSide: (value) => set({ side: value }),
  setMessage: (value) => set({ message: value }),
  setAgree: (value) => set({ agree: value }),
  count: 1,
  setCount: (value) => set({ count: value }),
}));
