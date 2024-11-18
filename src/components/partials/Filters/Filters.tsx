"use client";

import React, { ReactNode } from "react";
import {
  Paper,
  Box,
  IconButton,
  Popover,
  Typography,
  Drawer,
} from "@mui/material";
import { FilterList as FilterListIcon } from "@mui/icons-material";
import Button from "@/components/ui/Button";
import useFiltersResponsiveOptions from "./hooks/useFiltersResponsiveOptions";

interface Props {
  contentFilters: ReactNode;
  handleReset: () => void;
  handleApply: () => void;
}

export default function Filters({
  contentFilters,
  handleReset,
  handleApply,
}: Props) {
  const {
    isMobile,
    handleClick,
    handleClose,
    isDrawerOpen,
    anchorEl,
    id,
    open,
  } = useFiltersResponsiveOptions();

  const filterContent = (
    <Box
      component={Paper}
      sx={{ p: 2, width: isMobile ? "auto" : 300, mt: isMobile ? 7 : 0 }}
    >
      <Typography variant="h6" component="div" sx={{ mb: 2 }}>
        Filtros
      </Typography>
      {contentFilters}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 3 }}>
        <Button variant="outlined" size="small" action={handleReset} fullWidth>
          Limpiar Filtros
        </Button>
        <Button variant="contained" size="small" action={handleApply} fullWidth>
          Aplicar Filtros
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1100,
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
      {isMobile ? (
        <Drawer anchor="right" open={isDrawerOpen} onClose={handleClose}>
          {filterContent}
        </Drawer>
      ) : (
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {filterContent}
        </Popover>
      )}
    </>
  );
}
