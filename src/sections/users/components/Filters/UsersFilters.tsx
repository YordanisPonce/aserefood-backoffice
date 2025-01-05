import Filters from "@/components/partials/Filters/Filters";
import React from "react";
import useUsersFilters from "./hooks/useUsersFilters";
import UsersFiltersContent from "./UsersFiltersContent";

export default function UsersFilters() {
  const { filters, handleChangeFilters, handleReset } = useUsersFilters();
  return (
    <Filters
      handleReset={handleReset}
      contentFilters={
        <UsersFiltersContent
          filters={filters}
          handleFilterChange={handleChangeFilters}
        />
      }
    />
  );
}
