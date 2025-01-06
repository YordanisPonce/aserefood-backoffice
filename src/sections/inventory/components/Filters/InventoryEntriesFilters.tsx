import Filters from "@/components/partials/Filters/Filters";
import React from "react";
import useInventoryEntriesFilters from "./hooks/useInventoryEntriesFilters";
import InventoryEntriesFiltersContent from "./InventoryEntriesFiltersContent";

export default function InventoryEntriesFilters() {
  const { filters, handleChangeFilters, handleReset } =
    useInventoryEntriesFilters();
  return (
    <Filters
      handleReset={handleReset}
      contentFilters={
        <InventoryEntriesFiltersContent
          filters={filters}
          handleFilterChange={handleChangeFilters}
        />
      }
    />
  );
}
