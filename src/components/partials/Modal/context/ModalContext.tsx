"use client";
import React, { createContext, RefObject } from "react";
import useModal from "../hooks/useModal";

interface Props {
  currentModal: string | null;
  entityId: string | null;
  handleOpenModal: (modalName: string, entityId?: string) => void;
  handleCloseModal: () => void;
  contentRef: RefObject<HTMLDivElement>;
}

const defaultProps: Props = {
  currentModal: null,
  entityId: null,
  handleOpenModal: () => {
    throw new Error("handleOpenModal no está definido.");
  },
  handleCloseModal: () => {
    throw new Error("handleCloseModal no está definido.");
  },
  contentRef: { current: null } as RefObject<HTMLDivElement>,
};

export const ModalContext = createContext<Props>(defaultProps);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const {
    currentModal,
    entityId,
    handleOpenModal,
    handleCloseModal,
    contentRef,
  } = useModal();

  return (
    <ModalContext.Provider
      value={{
        currentModal,
        entityId,
        handleCloseModal,
        handleOpenModal,
        contentRef,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
