"use client";

import React from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  SelectChangeEvent,
} from "@mui/material";

import useProductsFiltersOptions from "./hooks/useProductsFiltersOptions";
import { ProductsFiltersType } from "./hooks/useProductsFilters";


interface Props {
  filters: ProductsFiltersType;
  handleFilterChange: (
    event:
      | SelectChangeEvent
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export default function ProductsFilters({
  filters,
  handleFilterChange,
}: Props) {
  const { categories, serviceOptions } = useProductsFiltersOptions();

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
        <InputLabel id="category-label">Categoría</InputLabel>
        <Select
          labelId="category-label"
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          label="Categoría"
        >
          {categories.map((category, index) => (
            <MenuItem key={index} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small">
        <InputLabel id="service-label">Servicio</InputLabel>
        <Select
          labelId="service-label"
          name="service"
          value={filters.isService}
          onChange={handleFilterChange}
          label="Servicio"
        >
          {serviceOptions.map((serviceOption, index) => (
            <MenuItem key={index} value={serviceOption}>
              {serviceOption}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
