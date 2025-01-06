import Filters from "@/components/partials/Filters/Filters";
import React from "react";
import useMunicipalitiesFilters from "./hooks/useMunicipalitiesFilters";
import MunicipalitiesFiltersContent from "./MunicipalitiesFiltersContent";

export default function MunicipalitiesFilters() {
  const { filters, handleChangeFilters, handleReset } =
    useMunicipalitiesFilters();
  return (
    <Filters
      handleReset={handleReset}
      contentFilters={
        <MunicipalitiesFiltersContent
          filters={filters}
          handleFilterChange={handleChangeFilters}
        />
      }
    />
  );
}
