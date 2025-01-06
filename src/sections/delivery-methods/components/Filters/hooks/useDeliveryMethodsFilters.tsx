"use client";
import { DeliveryMethodsFilters } from "@/lib/types/deliveryMethod";
import useFiltersUrl from "@/sections/hooks/useFiltersUrl";
import { useState } from "react";

export default function useDeliveryMethodsFilters() {
  const { updateFiltersInUrl } = useFiltersUrl();

  const [filters, setFilters] = useState<DeliveryMethodsFilters>({
    provinceId: undefined,
    municipalityId: undefined,
    isFree: undefined,
  });

  async function handleChangeFilters(updatedFilters: DeliveryMethodsFilters) {
    let newFilters: DeliveryMethodsFilters = {};
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
    const filtersReset: DeliveryMethodsFilters = {
      provinceId: undefined,
      municipalityId: undefined,
      isFree: undefined,
    };
    setFilters(filtersReset);

    updateFiltersInUrl(filtersReset);
  }

  return { filters, handleChangeFilters, handleReset };
}
