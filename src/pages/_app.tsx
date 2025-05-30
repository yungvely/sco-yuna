// src/pages/_app.tsx
import { GlobalStyle } from "@/styles/GlobalStyle";
import { theme } from "@/styles/theme";
import type { AppProps } from "next/app";
import styled, { ThemeProvider } from "styled-components";
import KakaoInit from "../components/common/KakaoInit";
import NaverMapLoader from "../components/common/NaverMapLoader";
import { useFontStore } from "../store/fontStore";

const AppWrapper = styled.div`
  background: ${({ theme }) => theme.colors.background};
  min-width: 320px;
  max-width: 425px;
  margin: 0 auto;
  position: relative;
  overflow-x: scroll;
`;
export default function MyApp({ Component, pageProps }: AppProps) {
  const scale = useFontStore((s) => s.scale);
  return (
    <ThemeProvider theme={{ ...theme, fontSize: `${16 * scale}px` }}>
      <NaverMapLoader />
      <KakaoInit />
      <AppWrapper>
        <GlobalStyle />
        <Component {...pageProps} />
      </AppWrapper>
    </ThemeProvider>
  );
}
