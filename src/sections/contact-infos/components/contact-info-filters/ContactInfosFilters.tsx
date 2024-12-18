"use client";
import SelectInputFilterFetcher from "@/components/common/input/SelectInputFilterFetcher";
import { ContactInfoFilters } from "@/lib/types/contactInfo";
import useAllMunicipalities from "@/sections/municipalities/hooks/useAllMunicipalities";
import { Box, TextField } from "@mui/material";
import React from "react";

interface Props {
  filters: ContactInfoFilters;
  handleFilterChange: (updatedFilters: ContactInfoFilters) => void;
}

export default function ContactInfosFilters({
  filters,
  handleFilterChange,
}: Props) {
  const {
    municipalities,
    error: errorAllMunicipalities,
    isLoading: isLoadingAllMunicipalities,
    fetchMunicipalities,
  } = useAllMunicipalities();

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField
        label="Buscar"
        variant="outlined"
        value={filters.search}
        onChange={(e) => handleFilterChange({ search: e.target.value })}
      />

      <SelectInputFilterFetcher
        value={filters.municipalityId}
        options={municipalities}
        error={errorAllMunicipalities}
        isLoading={isLoadingAllMunicipalities}
        fetcher={fetchMunicipalities}
        label="Municipio"
        onChange={(e) =>
          handleFilterChange({
            municipalityId:
              e.target.value === "" ? undefined : Number(e.target.value),
          })
        }
      />
    </Box>
  );
}
