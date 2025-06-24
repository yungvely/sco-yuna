// src/styles/fonts.ts
import localFont from "next/font/local";

export const BatangRegular = localFont({
  src: "./fonts/Batang_Regular.woff2",
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
  { type: "class", label: "BatangRegular", value: BatangRegular.className }, // 0
  { type: "class", label: "Mitchell", value: Mitchell.className }, // 1
  { type: "class", label: "노희찬체", value: NoHeeChan.className }, // 2
  { type: "class", label: "HetigonVintage", value: HetigonVintage.className }, // 3
  { type: "family", label: "GowunDodum", value: "GowunDodum-Regular" }, // 5
  { type: "family", label: "무궁체", value: "무궁체" }, // 5
  { type: "family", label: "르네상스", value: "르네상스" }, // 6
  { type: "family", label: "밍기적체", value: "밍기적체" }, // 7
  { type: "family", label: "Bedmiwoc", value: "Bedmiwoc" }, // 7
  { type: "family", label: "DarhoutyFrederics", value: "DarhoutyFrederics" }, // 8
  { type: "family", label: "KingRimba", value: "KingRimba" }, // 9
  { type: "family", label: "Migrand", value: "Migrand" }, // 10
  { type: "family", label: "WayCome", value: "WayCome" }, // 11
];
