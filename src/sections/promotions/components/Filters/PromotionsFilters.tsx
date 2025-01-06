import Filters from "@/components/partials/Filters/Filters";
import React from "react";
import usePromotionsFilters from "./hooks/usePromotionsFilters";
import PromotionsFiltersContent from "./PromotionsFiltersContent";

export default function PromotionsFilters() {
  const { filters, handleChangeFilters, handleReset } = usePromotionsFilters();
  return (
    <Filters
      handleReset={handleReset}
      contentFilters={
        <PromotionsFiltersContent
          filters={filters}
          handleFilterChange={handleChangeFilters}
        />
      }
    />
  );
}
