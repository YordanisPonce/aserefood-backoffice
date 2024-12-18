"use client";
import { ContactInfoFilters } from "@/lib/types/contactInfo";
import { useState } from "react";

export default function useContactInfosFilters() {
  const [filters, setFilters] = useState<ContactInfoFilters>({
    search: "",
    municipalityId: undefined,
  });

  function handleFilterChange(updatedFilters: ContactInfoFilters) {
    setFilters((filters) => ({
      ...filters,
      ...updatedFilters,
    }));
  }

  function handleReset() {
    setFilters({
      search: "",
      municipalityId: undefined,
    });
  }
  return { filters, handleFilterChange, handleReset };
}
