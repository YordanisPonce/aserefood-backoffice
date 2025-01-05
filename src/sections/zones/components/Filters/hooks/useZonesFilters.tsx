"use client";
import { ZonesFilters } from "@/lib/types/zone";
import useFiltersUrl from "@/sections/hooks/useFiltersUrl";
import { useState } from "react";

export default function useZonesFilters() {
  const { updateFiltersInUrl } = useFiltersUrl();

  const [filters, setFilters] = useState<ZonesFilters>({
    provinceId: undefined,
    municipalityId: undefined,
  });

  async function handleChangeFilters(updatedFilters: ZonesFilters) {
    let newFilters: ZonesFilters = {};
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
    const filtersReset: ZonesFilters = {
      provinceId: undefined,
      municipalityId: undefined,
    };
    setFilters(filtersReset);

    updateFiltersInUrl(filtersReset);
  }

  return { filters, handleChangeFilters, handleReset };
}
