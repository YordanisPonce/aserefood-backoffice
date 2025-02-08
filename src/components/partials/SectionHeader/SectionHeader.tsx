"use client";

import { Box, Button, Typography } from "@mui/material";
import React, { useContext } from "react";
import { Add as AddIcon } from "@mui/icons-material";
import { ModalContext } from "../Modal/context/ModalContext";

interface SectionHeaderProps {
  titleSection: string;
  titleButton?: string;
  createAction?: string;
}

export default function SectionHeader({
  titleSection,
  titleButton,
  createAction,
}: SectionHeaderProps) {
  const { handleOpenModal } = useContext(ModalContext);
  const handleClick = () => {
    if (createAction) {
      handleOpenModal(createAction);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        flexDirection: "row",
        mb: 2,
        justifyContent: "space-between",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        textTransform="capitalize"
        color="text.primary"
        fontWeight="700"
      >
        {titleSection}
      </Typography>
      {titleButton && (
        <Button
          variant="contained"
          onClick={handleClick}
          startIcon={<AddIcon />}
        >
          {titleButton}
        </Button>
      )}
    </Box>
  );
}
