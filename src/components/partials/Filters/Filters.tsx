"use client";

import React, { ReactNode } from "react";
import {
  Paper,
  Box,
  IconButton,
  Popover,
  Typography,
  Button,
} from "@mui/material";
import { FilterList as FilterListIcon } from "@mui/icons-material";
import useFiltersActions from "./hooks/useFiltersResponsiveOptions";

interface Props {
  contentFilters: ReactNode;
  handleReset: () => void;
}

export default function Filters({ contentFilters, handleReset }: Props) {
  const { handleClick, handleClose, anchorEl, id, open } = useFiltersActions();

  const filterContent = (
    <Box component={Paper} sx={{ p: 2, width: 300 }}>
      <Typography variant="h6" component="div" sx={{ mb: 2 }}>
        Filtros
      </Typography>
      {contentFilters}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 3 }}>
        <Button variant="outlined" size="small" onClick={handleReset} fullWidth>
          Limpiar Filtros
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          backgroundColor: "background.paper",
          p: 1,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <IconButton
          aria-describedby={id}
          onClick={handleClick}
          aria-label="Abrir filtros"
        >
          <Box
            sx={{
              diplay: "flex",
              flexDirection: "column",
              gap: 1,
              alignItems: "center",
            }}
          >
            <FilterListIcon />
          </Box>
        </IconButton>
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        {filterContent}
      </Popover>
    </>
  );
}
