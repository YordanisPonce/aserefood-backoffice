"use client";
import { PromotionsFilters } from "@/lib/types/promotion";
import useFiltersUrl from "@/sections/hooks/useFiltersUrl";
import { useState } from "react";

export default function usePromotionsFilters() {
  const { updateFiltersInUrl } = useFiltersUrl();

  const [filters, setFilters] = useState<PromotionsFilters>({
    productId: undefined,
    productComboId: undefined,
    isActive: undefined,
  });

  async function handleChangeFilters(updatedFilters: PromotionsFilters) {
    let newFilters: PromotionsFilters = {};
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
    const filtersReset: PromotionsFilters = {
      productId: undefined,
      productComboId: undefined,
      isActive: undefined,
    };
    setFilters(filtersReset);

    updateFiltersInUrl(filtersReset);
  }

  return { filters, handleChangeFilters, handleReset };
}
