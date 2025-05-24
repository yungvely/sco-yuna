"use client";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  @font-face {
    font-family: 'GowunDodum-Regular';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/GowunDodum-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
  html, body {
    font-family: 'GowunDodum-Regular', sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
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
`;
