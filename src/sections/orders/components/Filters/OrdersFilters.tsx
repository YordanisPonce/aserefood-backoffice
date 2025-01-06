import Filters from "@/components/partials/Filters/Filters";
import React from "react";
import useOrdersFilters from "./hooks/useOrdersFilters";
import OrdersFiltersContent from "./OrdersFiltersContent";

export default function OrdersFilters() {
  const { filters, handleChangeFilters, handleReset } = useOrdersFilters();
  return (
    <Filters
      handleReset={handleReset}
      contentFilters={
        <OrdersFiltersContent
          filters={filters}
          handleFilterChange={handleChangeFilters}
        />
      }
    />
  );
}
