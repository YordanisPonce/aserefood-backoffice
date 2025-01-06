"use client";
import { ProductCombosFilters } from "@/lib/types/productCombo";
import useFiltersUrl from "@/sections/hooks/useFiltersUrl";
import { useState } from "react";

export default function useProductCombosFilters() {
  const { updateFiltersInUrl } = useFiltersUrl();

  const [filters, setFilters] = useState<ProductCombosFilters>({
    productId: undefined,
    zoneId: undefined,
    isActive: undefined,
  });

  async function handleChangeFilters(updatedFilters: ProductCombosFilters) {
    let newFilters: ProductCombosFilters = {};
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
    const filtersReset: ProductCombosFilters = {
      productId: undefined,
      zoneId: undefined,
      isActive: undefined,
    };
    setFilters(filtersReset);

    updateFiltersInUrl(filtersReset);
  }

  return { filters, handleChangeFilters, handleReset };
}
