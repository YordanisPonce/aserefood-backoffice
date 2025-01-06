"use client";
import { InventoryEntriesFilters } from "@/lib/types/inventory";
import useFiltersUrl from "@/sections/hooks/useFiltersUrl";
import { useState } from "react";

export default function useInventoryEntriesFilters() {
  const { updateFiltersInUrl } = useFiltersUrl();

  const [filters, setFilters] = useState<InventoryEntriesFilters>({
    productId: undefined,
    zoneId: undefined,
  });

  async function handleChangeFilters(updatedFilters: InventoryEntriesFilters) {
    let newFilters: InventoryEntriesFilters = {};
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
    const filtersReset: InventoryEntriesFilters = {
      productId: undefined,
      zoneId: undefined,
    };
    setFilters(filtersReset);

    updateFiltersInUrl(filtersReset);
  }

  return { filters, handleChangeFilters, handleReset };
}
