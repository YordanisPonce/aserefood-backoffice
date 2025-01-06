"use client";
import { OrdersFilters } from "@/lib/types/order";
import useFiltersUrl from "@/sections/hooks/useFiltersUrl";
import { useState } from "react";

export default function useOrdersFilters() {
  const { updateFiltersInUrl } = useFiltersUrl();

  const [filters, setFilters] = useState<OrdersFilters>({
    code: undefined,
    deliveryMethodId: undefined,
    municipalityId: undefined,
    userId: undefined,
  });

  async function handleChangeFilters(updatedFilters: OrdersFilters) {
    let newFilters: OrdersFilters = {};
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
    const filtersReset: OrdersFilters = {
      code: undefined,
      deliveryMethodId: undefined,
      municipalityId: undefined,
      userId: undefined,
    };
    setFilters(filtersReset);

    updateFiltersInUrl(filtersReset);
  }

  return { filters, handleChangeFilters, handleReset };
}
