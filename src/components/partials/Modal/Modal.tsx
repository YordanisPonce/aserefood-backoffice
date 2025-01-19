"use client";
import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { ReactNode, useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { ModalContext, ModalProvider } from "./context/ModalContext";
interface ModalProps {
  formPath: string[];
  titleModal: string;
  children: ReactNode;
}

export default function Modal({ formPath, children, titleModal }: ModalProps) {
  return (
    <ModalProvider>
      <ModalContent formPath={formPath} titleModal={titleModal}>
        {children}
      </ModalContent>
    </ModalProvider>
  );
}

interface ModalContentProps {
  formPath: string[];
  titleModal: string;
  children: ReactNode;
}

function ModalContent({ children, formPath, titleModal }: ModalContentProps) {
  const { currentModal, contentRef, handleCloseModal } =
    useContext(ModalContext);
  return (
    <Dialog
      open={currentModal !== null && formPath.includes(currentModal)}
      maxWidth={"md"}
      fullWidth
      keepMounted={false}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <DialogTitle id="alert-dialog-title">{titleModal}</DialogTitle>
        <CloseIcon
          sx={{ mr: 2, "&:hover": { color: "error.main" }, cursor: "pointer" }}
          onClick={() => handleCloseModal()}
        />
      </Box>
      <DialogContent ref={contentRef}>
        {/* Form container */}
        {children}
      </DialogContent>
    </Dialog>
  );
}
