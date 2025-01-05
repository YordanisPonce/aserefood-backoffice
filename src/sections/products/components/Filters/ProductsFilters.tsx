import Filters from "@/components/partials/Filters/Filters";
import React from "react";
import useProductsFilters from "./hooks/useProductsFilters";
import ProductsFiltersContent from "./ProductsFiltersContent";

export default function ProductsFilters() {
  const { filters, handleChangeFilters, handleReset } = useProductsFilters();
  return (
    <Filters
      handleReset={handleReset}
      contentFilters={
        <ProductsFiltersContent
          filters={filters}
          handleFilterChange={handleChangeFilters}
        />
      }
    />
  );
}
