"use client";
import { Box, Card, CardMedia, Dialog } from "@mui/material";
import React from "react";
import useDialogPreviewImage from "./hooks/useDialogPreviewImage";

interface Props {
  preview: string;
}

export default function PreviewImage({ preview }: Props) {
  const { openFullView, handleCloseDialog, handleOpenDialog } =
    useDialogPreviewImage();
  return (
    <>
      <Card
        sx={{
          width: 600,
          height: 240,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CardMedia
          component="img"
          image={preview}
          alt="Vista previa"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "fill",
            cursor: "pointer",
          }}
          onClick={handleOpenDialog}
        />
      </Card>

      <Dialog open={openFullView} onClose={handleCloseDialog} maxWidth="lg">
        <Box display="flex" justifyContent="center" alignItems="center" p={2}>
          <CardMedia
            component="img"
            image={preview || ""}
            alt="Vista previa"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "fill",
              cursor: "pointer",
            }}
          />
        </Box>
      </Dialog>
    </>
  );
}
