"use client";
import { ReportsFilters } from "@/lib/types/reports";
import useFiltersUrl from "@/sections/hooks/useFiltersUrl";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function useReportsFilters() {
  const { updateFiltersInUrl } = useFiltersUrl();
  const searchParams = useSearchParams();

  // Función para obtener los valores iniciales desde la URL
  const getInitialFilters = (): ReportsFilters => {
    return {
      startDate: searchParams.get("startDate") || undefined,
      endDate: searchParams.get("endDate") || undefined,
      quantity: searchParams.get("quantity") || undefined,
    };
  };

  const [filters, setFilters] = useState<ReportsFilters>(getInitialFilters);

  useEffect(() => {
    setFilters(getInitialFilters()); // Sincroniza con la URL cuando cambian los params
  }, [searchParams]);

  async function handleChangeFilters(updatedFilters: ReportsFilters) {
    let newFilters: ReportsFilters = {};
    await setFilters((prev) => {
      newFilters = { ...prev, ...updatedFilters };
      return newFilters;
    });

    updateFiltersInUrl(newFilters);
  }

  function handleReset() {
    const filtersReset: ReportsFilters = {
      startDate: undefined,
      endDate: undefined,
      quantity: undefined,
    };
    setFilters(filtersReset);
    updateFiltersInUrl(filtersReset);
  }

  return { filters, handleChangeFilters, handleReset };
}
