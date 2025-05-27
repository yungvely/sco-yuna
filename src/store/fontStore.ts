import { create } from "zustand";

interface FontStore {
  scale: number; // ex: 1.0 = 기본 100%
  increase: () => void;
  decrease: () => void;
}

export const useFontStore = create<FontStore>((set, get) => ({
  scale: 1.0,
  increase: () => {
    const current = get().scale;
    if (current < 1.2) {
      set({ scale: parseFloat((current + 0.1).toFixed(2)) });
      document.documentElement.style.setProperty(
        "--global-font-scale",
        (current + 0.1).toString()
      );
    }
  },
  decrease: () => {
    const current = get().scale;
    if (current > 1.0) {
      set({ scale: parseFloat((current - 0.1).toFixed(2)) });
      document.documentElement.style.setProperty(
        "--global-font-scale",
        (current - 0.1).toString()
      );
    }
  },
}));
