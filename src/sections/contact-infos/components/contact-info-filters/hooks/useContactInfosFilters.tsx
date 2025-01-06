"use client";
import { ContactInfosFilters } from "@/lib/types/contactInfo";
import { useState } from "react";

export default function useContactInfosFilters() {
  const [filters, setFilters] = useState<ContactInfosFilters>({
    search: "",
    municipalityId: undefined,
    provinceId: undefined,
  });

  function handleFilterChange(updatedFilters: ContactInfosFilters) {
    setFilters((filters) => ({
      ...filters,
      ...updatedFilters,
    }));
  }

  function handleReset() {
    setFilters({
      search: "",
      municipalityId: undefined,
      provinceId: undefined,
    });
  }
  return { filters, handleFilterChange, handleReset };
}
