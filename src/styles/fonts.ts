// src/styles/fonts.ts
import localFont from "next/font/local";

export const BatangRegular = localFont({
  src: "./fonts/Batang_Regular.woff",
  weight: "400",
  style: "normal",
  preload: true,
  display: "swap",
});

export const NoHeeChan = localFont({
  src: "./fonts/노희찬체.otf",
  weight: "400",
  style: "normal",
  preload: true,
  display: "swap",
});

export const Mitchell = localFont({
  src: "./fonts/Mitchell.otf",
  weight: "400",
  style: "normal",
  preload: true,
  display: "swap",
});

export const HetigonVintage = localFont({
  src: "./fonts/HetigonVintage.otf",
  weight: "400",
  style: "normal",
  preload: true,
  display: "swap",
});

export const fontMap = [
  { type: "class", label: "BatangRegular", value: BatangRegular.className },
  { type: "class", label: "노희찬체", value: NoHeeChan.className },
  { type: "family", label: "르네상스", value: "르네상스" },
  { type: "family", label: "밍기적체", value: "밍기적체" },
  { type: "family", label: "밑미", value: "밑미" },
  { type: "family", label: "콘콘체", value: "콘콘체" },
  { type: "class", label: "Mitchell", value: Mitchell.className },
  { type: "family", label: "Bedmiwoc", value: "Bedmiwoc" },
  { type: "family", label: "DarhoutyFrederics", value: "DarhoutyFrederics" },
  { type: "family", label: "GowunDodum", value: "GowunDodum-Regular" },
  { type: "class", label: "HetigonVintage", value: HetigonVintage.className },
  { type: "family", label: "안창호체", value: "KCC-Ahnchangho" },
  { type: "family", label: "KingRimba", value: "KingRimba" },
  { type: "family", label: "Migrand", value: "Migrand" },
  { type: "family", label: "WayCome", value: "WayCome" },
];
