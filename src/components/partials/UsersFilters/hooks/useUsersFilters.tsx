"use client"
import { SelectChangeEvent } from "@mui/material";
import React, { useState } from "react";

export type UsersFilters = {
  search: string;
  role: string;
  status: string;
};

export default function useUsersFilters() {
  const [filters, setFilters] = useState<UsersFilters>({
    search: "",
    role: "",
    status: "",
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
      role: "",
      status: "",
    });
  };

  const handleApply = () => {};
  return { filters, handleApply, handleReset, handleFilterChange };
}
