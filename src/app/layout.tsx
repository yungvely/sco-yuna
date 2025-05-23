import NaverMapLoader from "@/components/common/NaverMapLoader";
import StyledProvider from "@/styles/StyledProvider";

export const metadata = {
  title: "25.8.23 석호 ❤️ 윤아 결혼합니다",
  description: "소중한 분들을 초대합니다",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: "no",
  },
  openGraph: {
    title: "25.8.23 석호 ❤️ 윤아 결혼합니다",
    description: "소중한 분들을 초대합니다",
    url: "https://sco-yuna.kr",
    images: [
      {
        url: "https://images.theirmood.com/resources/81284/card/onir9Erp90/R4ODazWRcC.jpg?f=webp&w=1280",
        width: 800,
        height: 600,
        alt: "석호❤️윤아 결혼합니다",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <StyledProvider>{children}</StyledProvider>
        <NaverMapLoader />
      </body>
    </html>
  );
}
