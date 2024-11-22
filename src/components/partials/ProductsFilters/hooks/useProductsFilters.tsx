"use client"
import { SelectChangeEvent } from "@mui/material";
import React, { useState } from "react";

export type ProductsFiltersType = {
  search: string;
  category: string;
  isService: string;
};

export default function useProductsFilters() {
  const [filters, setFilters] = useState<ProductsFiltersType>({
    search: "",
    category: "",
    isService: "",
  });

  const handleFilterChange = (
    event: SelectChangeEvent | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name as string]: value,
    }));
  };

  const handleReset = () => {
    setFilters({
      search: "",
      category: "",
      isService: "",
    });
  };

  const handleApply = () => {};
  return { filters, handleApply, handleReset, handleFilterChange };
}
