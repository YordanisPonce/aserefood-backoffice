"use client";
import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { ReactNode } from "react";
import useModal from "./hooks/useModal";
import CloseIcon from "@mui/icons-material/Close";
interface ModalProps {
  formPath: string[];
  titleModal: string;
  children: ReactNode;
}

export default function Modal({ formPath, children, titleModal }: ModalProps) {
  const { currentModal, handleCloseModal } = useModal();

  return (
    <>
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
            sx={{ mr: 2, "&:hover": { color: "error.main" } }}
            onClick={() => handleCloseModal()}
          />
        </Box>
        <DialogContent>
          {/* Form container */}
          {children}
        </DialogContent>
      </Dialog>
    </>
  );
}
