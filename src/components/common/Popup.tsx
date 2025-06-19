"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import styled from "styled-components";

type CommonPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  children: React.ReactNode;
};

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  padding: 0 20px;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const PopupBox = styled(motion.div)`
  background: #fff;
  border-radius: 16px;
  width: 100%;
  max-width: 320px;
  max-height: 70vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 32px 24px 16px;
  text-align: left;
`;

const ButtonArea = styled.div<{ $single?: boolean }>`
  display: flex;
  border-top: 1px solid #eee;

  button {
    flex: 1;
    padding: 16px;
    font-size: 16px;
    border: none;
    background: none;
    cursor: pointer;
  }

  button:first-child {
    color: #555;
  }

  button:last-child {
    color: #fff;
    background: #b5896a;
    // border-radius: ${({ $single }) => ($single ? "0 0 16px 16px" : "0")};
  }

  ${({ $single }) =>
    $single &&
    `
    button {
      color: #fff;
      background: #b5896a;
    }
  `}
`;

export const CommonPopup = ({
  isOpen,
  onClose,
  onConfirm,
  confirmText = "확인",
  cancelText = "닫기",
  children,
}: CommonPopupProps) => {
  useEffect(() => {
    if (!isOpen) return;
    const handlePopState = () => {
      onClose();
    };
    window.history.pushState({ popup: true }, "");
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);

      if (window.history.state?.popup) {
        if (!isOpen) {
          window.history.back();
        }
      }
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <PopupBox
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e: React.MouseEvent<HTMLDivElement>) =>
              e.stopPropagation()
            }
          >
            <Content>{children}</Content>
            <ButtonArea $single={!onConfirm}>
              {onConfirm ? (
                <>
                  <button onClick={onClose}>{cancelText}</button>
                  <button onClick={onConfirm}>{confirmText}</button>
                </>
              ) : (
                <button onClick={onClose}>{cancelText}</button>
              )}
            </ButtonArea>
          </PopupBox>
        </Overlay>
      )}
    </AnimatePresence>
  );
};
