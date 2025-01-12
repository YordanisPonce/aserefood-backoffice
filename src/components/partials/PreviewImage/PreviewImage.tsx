"use client";

import { Box, Card, CardMedia, Dialog } from "@mui/material";
import React from "react";
import Image from "next/image";
import useDialogPreviewImage from "./hooks/useDialogPreviewImage";

interface Props {
  preview: string;
}

export default function PreviewImage({ preview }: Props) {
  const { openFullView, handleCloseDialog, handleOpenDialog } =
    useDialogPreviewImage();

  return (
    <>
      <Card>
        <CardMedia
          component={"div"}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "fill",
            cursor: "pointer",
          }}
        >
          <Image
            src={preview}
            alt="Vista previa"
            width={600}
            height={240}
            onClick={handleOpenDialog}
          />
        </CardMedia>
      </Card>
      <Dialog open={openFullView} onClose={handleCloseDialog} maxWidth="lg">
        <Box display="flex" justifyContent="center" alignItems="center" p={2}>
          <Image src={preview} alt="Vista previa" width={1000} height={600} />
        </Box>
      </Dialog>
    </>
  );
}
