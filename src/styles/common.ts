import styled from "styled-components";

export const FixedWrapper = styled.div<{ position?: "top" | "bottom" }>`
  position: fixed;
  left: 50%;
  ${({ position }) => (position === "bottom" ? `bottom:0;` : "top:0;")};

  transform: translateX(-50%);
  max-width: 425px;
  width: 100%;
  padding: 0 12px;
  display: flex;
  justify-content: flex-end;
  z-index: 99999;
`;
