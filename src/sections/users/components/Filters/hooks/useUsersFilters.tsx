"use client";
import { UsersFilters } from "@/lib/types/users";
import useFiltersUrl from "@/sections/hooks/useFiltersUrl";
import { useState } from "react";

export default function useUsersFilters() {
  const { updateFiltersInUrl } = useFiltersUrl();

  const [filters, setFilters] = useState<UsersFilters>({
    role: undefined,
    isActive: undefined,
  });

  async function handleChangeFilters(updatedFilters: UsersFilters) {
    let newFilters: UsersFilters = {};
    await setFilters((prev) => {
      newFilters = {
        ...prev,
        ...updatedFilters,
      };
      return newFilters;
    });
    updateFiltersInUrl(newFilters);
  }

  function handleReset() {
    const filtersReset: UsersFilters = {
      role: undefined,
      isActive: undefined,
    };
    setFilters(filtersReset);

    updateFiltersInUrl(filtersReset);
  }

  return { filters, handleChangeFilters, handleReset };
}
