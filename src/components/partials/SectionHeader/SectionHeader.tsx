"use client";

import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Add as AddIcon } from "@mui/icons-material";
import useModal from "../Modal/hooks/useModal";

interface SectionHeaderProps {
  titleSection: string;
  titleButton: string;
  createAction?: string;
}

export default function SectionHeader({
  titleSection,
  titleButton,
  createAction,
}: SectionHeaderProps) {
  const { handleOpenModal } = useModal();
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
      <Button variant="contained" onClick={handleClick} startIcon={<AddIcon />}>
        {titleButton}
      </Button>
    </Box>
  );
}
