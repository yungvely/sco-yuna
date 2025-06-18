import { create } from "zustand";

type RSVPState = {
  attending: "yes" | "no" | null;
  name: string;
  phone: string;
  side: "groom" | "bride" | null;
  message: string;
  setAttending: (value: "yes" | "no") => void;
  setName: (value: string) => void;
  setPhone: (value: string) => void;
  setSide: (value: "groom" | "bride") => void;
  setMessage: (value: string) => void;
  count: number;
  setCount: (value: number) => void;
};

export const useRsvpStore = create<RSVPState>((set) => ({
  attending: null,
  name: "",
  phone: "",
  side: null,
  message: "",
  setAttending: (value) => set({ attending: value }),
  setName: (value) => set({ name: value }),
  setPhone: (value) => set({ name: value }),
  setSide: (value) => set({ side: value }),
  setMessage: (value) => set({ message: value }),
  count: 1,
  setCount: (value) => set({ count: value }),
}));
