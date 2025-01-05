import Filters from "@/components/partials/Filters/Filters";
import React from "react";
import useCategoriesFilters from "./hooks/useCategoriesFilters";
import CategoriesFiltersContent from "./CategoriesFiltersContent";

export default function CategoriesFilters() {
  const { filters, handleChangeFilters, handleReset } = useCategoriesFilters();
  return (
    <Filters
      handleReset={handleReset}
      contentFilters={
        <CategoriesFiltersContent
          filters={filters}
          handleFilterChange={handleChangeFilters}
        />
      }
    />
  );
}
