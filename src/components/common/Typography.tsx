// src/components/common/Typography.tsx
import { fontMap } from "@/styles/fonts";
import { ElementType, ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode;
  font?: number; // 숫자로 폰트 선택 (1~N)
  size?: number; // em 단위 폰트 사이즈
  color?: string;
  lineHeight?: number;
  center?: boolean;
  as?: ElementType;
  style?: React.CSSProperties;
  letterSpacing?: number;
};

const Typography = ({
  children,
  font = 0,
  size = 1,
  color = "inherit",
  lineHeight = 1.2,
  center = false,
  as = "span",
  letterSpacing,
  style,
}: Props) => {
  const fontEntry = fontMap[font];

  const isClassFont = fontEntry?.type === "class";

  return (
    <StyledText
      as={as}
      className={isClassFont ? fontEntry.value : ""}
      $font={isClassFont ? undefined : fontEntry.value}
      $size={size}
      $color={color}
      $letterSpacing={letterSpacing}
      $lineHeight={lineHeight}
      $center={center}
      style={style}
    >
      {children}
    </StyledText>
  );
};

export default Typography;

const StyledText = styled.p<{
  $font: string;
  $size: number;
  $color: string;
  $lineHeight: number;
  $center: boolean;
  $letterSpacing?: number;
}>`
  ${({ $font }) => ($font ? `font-family: ${$font}, sans-serif` : "")};
  font-size: ${({ $size }) => `${$size}em`};
  color: ${({ $color }) => $color};
  line-height: ${({ $lineHeight }) => $lineHeight};
  text-align: ${({ $center }) => ($center ? "center" : "left")};
  ${({ $letterSpacing }) =>
    $letterSpacing ? `letter-spacing: ${$letterSpacing}px` : ""};
`;
