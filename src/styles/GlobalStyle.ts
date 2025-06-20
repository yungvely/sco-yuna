"use client";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  @font-face {
    font-family: "르네상스";
    src: url("/fonts/르네상스.ttf") format("truetype");
    font-weight: 400;
    font-style: normal;
  }
  
  @font-face {
    font-family: "밍기적체";
    src: url("/fonts/밍기적체.ttf") format("truetype");
    font-weight: 400;
    font-style: normal;
  }
  
  @font-face {
    font-family: "밑미";
    src: url("/fonts/밑미.ttf") format("truetype");
    font-weight: 400;
    font-style: normal;
  }
  
  @font-face {
    font-family: "콘콘체";
    src: url("/fonts/콘콘체.ttf") format("truetype");
    font-weight: 400;
    font-style: normal;
  }
  
  @font-face {
    font-family: "Bedmiwoc";
    src: url("/fonts/Bedmiwoc.otf") format("opentype");
    font-weight: 400;
    font-style: normal;
  }
  
  @font-face {
    font-family: "DarhoutyFrederics";
    src: url("/fonts/DarhoutyFrederics.otf") format("opentype");
    font-weight: 400;
    font-style: normal;
  }
  
  @font-face {
    font-family: "GowunDodum-Regular";
    src: url("/fonts/GowunDodum-Regular.woff2") format("woff2"),
         url("/fonts/GowunDodum-Regular.ttf") format("truetype");
    font-weight: 400;
    font-style: normal;
  }
  
  @font-face {
    font-family: "KCC-Ahnchangho";
    src: url("/fonts/KCC-Ahnchangho.woff2") format("woff2"),
         url("/fonts/KCC-Ahnchangho.otf") format("opentype");
    font-weight: 400;
    font-style: normal;
  }
  
  @font-face {
    font-family: "KingRimba";
    src: url("/fonts/KingRimba.ttf") format("truetype");
    font-weight: 400;
    font-style: normal;
  }
  
  @font-face {
    font-family: "Migrand";
    src: url("/fonts/Migrand.otf") format("opentype");
    font-weight: 400;
    font-style: normal;
  }
  
  @font-face {
    font-family: "WayCome";
    src: url("/fonts/WayCome.otf") format("opentype");
    font-weight: 400;
    font-style: normal;
  }
  
  
  

  html {
    font-size: ${({ theme }) => theme.fontSize || "16px"};
  }

  html, body {
    padding: 0;
    margin: 0;
    background-color: #f6f6f6;
    color: ${({ theme }) => theme.colors.text};
    word-break: auto-phrase;
    word-wrap: break-word;

    touch-action: manipulation;
    -ms-touch-action: manipulation;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -webkit-text-size-adjust: 100%;
    user-select: none;

    touch-action: manipulation;
    zoom: 1; /* 이걸로 안드로이드 일부에서 확대 방지됨 */
    zoom: reset; /* 일부 브라우저 대응 */

    overscroll-behavior: none; /* ← 스크롤 튐 방지 */
    -webkit-overflow-scrolling: touch; /* ← 부드러운 터치 스크롤 */

    -webkit-text-size-adjust: none;
  }

  * {
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }
  button, a {
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none; 
  }
  button {
    font-family: inherit;
    background: none;
    border: none;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
  }
  
  input, textarea, select {
    font-size: 16px; /* iOS는 16px 미만이면 자동 확대 발생 가능 */
    font-family: inherit;
  }

`;
