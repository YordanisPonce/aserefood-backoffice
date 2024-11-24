"use client";

import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Add as AddIcon } from "@mui/icons-material";
import useUrlParams from "@/lib/hooks/useUrlParams";

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
  const { updateSearchParams } = useUrlParams();

  const handleClick = () => {
    if (createAction) {
      updateSearchParams({
        currentModal: {
          action: "set",
          value: createAction,
        },
      });
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
