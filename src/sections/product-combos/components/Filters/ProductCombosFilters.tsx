import Filters from "@/components/partials/Filters/Filters";
import React from "react";
import useProductCombosFilters from "./hooks/useProductCombosFilters";
import ProductCombosFiltersContent from "./ProductCombosFiltersContent";

export default function ProductCombosFilters() {
  const { filters, handleChangeFilters, handleReset } =
    useProductCombosFilters();
  return (
    <Filters
      handleReset={handleReset}
      contentFilters={
        <ProductCombosFiltersContent
          filters={filters}
          handleFilterChange={handleChangeFilters}
        />
      }
    />
  );
}
