import Filters from "@/components/partials/Filters/Filters";
import React from "react";
import ContactInfosFiltersContent from "./ContactInfosFiltersContent";
import { ContactInfosFilters } from "@/lib/types/contactInfo";

interface Props {
  filters: ContactInfosFilters;
  handleChangeFilters: (filters: ContactInfosFilters) => void;
  handleReset: () => void;
}

export default function ContactInfosFiltersComponent({
  filters,
  handleChangeFilters,
  handleReset,
}: Props) {
  return (
    <Filters
      handleReset={handleReset}
      contentFilters={
        <ContactInfosFiltersContent
          filters={filters}
          handleFilterChange={handleChangeFilters}
        />
      }
    />
  );
}
