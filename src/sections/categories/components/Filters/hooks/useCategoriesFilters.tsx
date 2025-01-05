"use client";
import { CategoriesFilters } from "@/lib/types/category";
import useFiltersUrl from "@/sections/hooks/useFiltersUrl";
import { useState } from "react";

export default function useCategoriesFilters() {
  const { updateFiltersInUrl } = useFiltersUrl();

  const [filters, setFilters] = useState<CategoriesFilters>({
    parentId: undefined,
  });

  async function handleChangeFilters(updatedFilters: CategoriesFilters) {
    let newFilters: CategoriesFilters = {};
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
    const filtersReset: CategoriesFilters = {
      parentId: undefined
    };
    setFilters(filtersReset);

    updateFiltersInUrl(filtersReset);
  }

  return { filters, handleChangeFilters, handleReset };
}
