"use client";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  @font-face {
    font-family: "경기바탕체";
    src: url("/fonts/Batang_Regular.woff") format("woff");
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "고운돋음";
    src: url("/fonts/GowunDodum-Regular.woff2") format("woff2");
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }


  @font-face {
    font-family: "안창호체";
    src: url("/fonts/KCC-Ahnchangho.woff2") format("woff2");
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  

  * {
    font-family: "경기바탕체", sans-serif;
  }

  html {
    font-size: ${({ theme }) => theme.fontSize || "16px"};
    line-height: 1.5;
  }
  html, body {
    background-color: #f6f6f6;
    color: ${({ theme }) => theme.colors.text};


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
  }

  * {
    touch-action: manipulation;
  }
  input, textarea {
    font-size: 16px; /* iOS는 16px 미만이면 자동 확대 발생 가능 */
  }
  
  .yarl__slide_image {
    max-width: 425px !important;
    margin: 0 auto;
    display: block;
  }

  .yarl__container {
    background-color: rgba(0, 0, 0, 0.8) !important;
  }

  .yarl__slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }

`;
