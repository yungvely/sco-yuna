// src/pages/_app.tsx
import { GlobalStyle } from "@/styles/GlobalStyle";
import StyledProvider from "@/styles/StyledProvider";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StyledProvider>
      <GlobalStyle />
      <Component {...pageProps} />
    </StyledProvider>
  );
}
