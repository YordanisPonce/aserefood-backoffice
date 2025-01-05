import Filters from "@/components/partials/Filters/Filters";
import React from "react";
import useZonesFilters from "./hooks/useZonesFilters";
import ZonesFiltersContent from "./ZonesFiltersContainer";

export default function ZonesFilters() {
  const { filters, handleChangeFilters, handleReset } = useZonesFilters();
  return (
    <Filters
      handleReset={handleReset}
      contentFilters={
        <ZonesFiltersContent
          filters={filters}
          handleFilterChange={handleChangeFilters}
        />
      }
    />
  );
}
