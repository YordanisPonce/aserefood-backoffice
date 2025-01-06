import Filters from "@/components/partials/Filters/Filters";
import React from "react";
import DeliveryMethodsFiltersContent from "./DeliveryMethodsFiltersContent";
import useDeliveryMethodsFilters from "./hooks/useDeliveryMethodsFilters";

export default function DeliveryMethodsFilters() {
  const { filters, handleChangeFilters, handleReset } =
    useDeliveryMethodsFilters();
  return (
    <Filters
      handleReset={handleReset}
      contentFilters={
        <DeliveryMethodsFiltersContent
          filters={filters}
          handleFilterChange={handleChangeFilters}
        />
      }
    />
  );
}
