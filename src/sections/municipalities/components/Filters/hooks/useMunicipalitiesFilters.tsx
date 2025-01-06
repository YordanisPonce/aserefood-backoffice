"use client";
import { MunicipalitiesFilters } from "@/lib/types/municipality";
import useFiltersUrl from "@/sections/hooks/useFiltersUrl";
import { useState } from "react";

export default function useMunicipalitiesFilters() {
  const { updateFiltersInUrl } = useFiltersUrl();

  const [filters, setFilters] = useState<MunicipalitiesFilters>({
    provinceId: undefined,
  });

  async function handleChangeFilters(updatedFilters: MunicipalitiesFilters) {
    let newFilters: MunicipalitiesFilters = {};
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
    const filtersReset: MunicipalitiesFilters = {
      provinceId: undefined,
    };
    setFilters(filtersReset);

    updateFiltersInUrl(filtersReset);
  }

  return { filters, handleChangeFilters, handleReset };
}
