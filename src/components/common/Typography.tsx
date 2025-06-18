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
};

const Typography = ({
  children,
  font = 1,
  size = 1,
  color = "#333",
  lineHeight = 1.2,
  center = false,
  as = "span",
  style,
}: Props) => {
  const fontEntry = fontMap[font - 1];

  const isClassFont = fontEntry?.type === "class";
  const className = isClassFont ? fontEntry.value : "";

  return (
    <StyledText
      as={as}
      className={className}
      $font={fontEntry?.type === "family" ? fontEntry.value : ""}
      $size={size}
      $color={color}
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
}>`
  font-family: ${({ $font }) => $font}, sans-serif;
  font-size: ${({ $size }) => `${$size}em`};
  color: ${({ $color }) => $color};
  line-height: ${({ $lineHeight }) => $lineHeight};
  text-align: ${({ $center }) => ($center ? "center" : "left")};
`;
