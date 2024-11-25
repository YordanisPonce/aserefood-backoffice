"use client";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React, { ReactNode } from "react";
import useModal from "./hooks/useModal";

interface ModalProps {
  formPath: string;
  titleModal: string;
  children: ReactNode;
}

export default function Modal({ formPath, children, titleModal }: ModalProps) {
  const { currentModal, entityId } = useModal();

  return (
    <>
      {currentModal === formPath && (
        <Dialog
          open={currentModal === formPath}
          maxWidth={"md"}
          fullWidth
          keepMounted={false}
        >
          <DialogTitle id="alert-dialog-title">
            {`${(entityId ? "Actualizar " : "Crear ") + titleModal}`}{" "}
          </DialogTitle>
          <DialogContent>
            {/* Form container */}
            {children}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
