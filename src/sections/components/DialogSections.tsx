"use client";
import { Box, Button, Dialog, DialogTitle } from "@mui/material";
import React, { ReactNode } from "react";
import useDialog from "./Dialog/hooks/useDialog";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  title: string;
  buttonTitle: string;
  children: ReactNode;
}

export default function DialogSections({
  children,
  buttonTitle,
  title,
}: Props) {
  const { open, handleOpenDialog, handleCloseDialog } = useDialog();

  return (
    <>
      <Button onClick={handleOpenDialog}>{buttonTitle}</Button>
      <Dialog open={open} onClose={handleCloseDialog} maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <DialogTitle id="dialog-section-title">{title}</DialogTitle>
          <CloseIcon
            sx={{ mr: 2, "&:hover": { color: "error.main" } }}
            onClick={handleCloseDialog}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width={500}
          p={2}
        >
          {children}
        </Box>
      </Dialog>
    </>
  );
}
