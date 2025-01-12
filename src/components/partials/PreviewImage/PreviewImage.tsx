"use client";

import { Box, Card, Dialog } from "@mui/material";
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
      <Card
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          src={preview}
          alt="Vista previa"
          width={600}
          height={400}
          style={{
            objectFit: "fill",
            cursor: "pointer",
          }}
          onClick={handleOpenDialog}
        />
      </Card>

      <Dialog open={openFullView} onClose={handleCloseDialog} maxWidth="lg">
        <Box display="flex" justifyContent="center" alignItems="center" p={2}>
          <Image
            src={preview}
            alt="Vista previa"
            width={1000}
            height={600}
            style={{
              objectFit: "fill",
              cursor: "pointer",
            }}
          />
        </Box>
      </Dialog>
    </>
  );
}
