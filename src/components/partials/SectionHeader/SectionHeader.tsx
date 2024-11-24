"use client";

import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Add as AddIcon } from "@mui/icons-material";

interface SectionHeaderProps {
  titleSection: string;
  titleButton: string;
  actionCreate?: () => void;
}

export default function SectionHeader({
  titleSection,
  titleButton,
  actionCreate,
}: SectionHeaderProps) {
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
      <Button
        variant="contained"
        onClick={actionCreate}
        startIcon={<AddIcon />}
      >
        {titleButton}
      </Button>
    </Box>
  );
}
