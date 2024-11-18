"use client";

import React, { useState, useEffect } from "react";
import {
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  IconButton,
  Popover,
  Typography,
  SelectChangeEvent,
  Drawer,
  useMediaQuery,
  useTheme,
  Theme,
} from "@mui/material";
import { FilterList as FilterListIcon } from "@mui/icons-material";
import Button from "@/components/ui/Button";
import useUsersFiltersOptions from "./hooks/useUsersFiltersOptions";

interface UsersFilters {
  search: string;
  role: string;
  status: string;
}

interface Props {
  filters: UsersFilters;
  handleFilterChange: (
    event:
      | SelectChangeEvent
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export default function UsersFilters({ filters, handleFilterChange }: Props) {
  const { roles, isActiveOptions } = useUsersFiltersOptions();

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField
        fullWidth
        label="Buscar"
        name="search"
        value={filters.search}
        onChange={handleFilterChange}
        variant="outlined"
        size="small"
      />
      <FormControl fullWidth size="small">
        <InputLabel id="role-label">Rol</InputLabel>
        <Select
          labelId="role-label"
          name="role"
          value={filters.role}
          onChange={handleFilterChange}
          label="Rol"
        >
          {roles.map((role, index) => (
            <MenuItem key={index} value={role}>
              {role}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small">
        <InputLabel id="status-label">Estado</InputLabel>
        <Select
          labelId="status-label"
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          label="Estado"
        >
          {isActiveOptions.map((status, index) => (
            <MenuItem key={index} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
