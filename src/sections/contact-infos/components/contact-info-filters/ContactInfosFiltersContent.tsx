import SelectInputFilterFetcher from "@/components/common/input/SelectInputFilterFetcher";
import { ContactInfosFilters } from "@/lib/types/contactInfo";
import useAllMunicipalities from "@/sections/municipalities/hooks/useAllMunicipalities";
import useAllProvinces from "@/sections/provinces/hooks/useAllProvinces";
import { Box, TextField } from "@mui/material";
import React from "react";

interface Props {
  filters: ContactInfosFilters;
  handleFilterChange: (updatedFilters: ContactInfosFilters) => void;
}

export default function ContactInfosFiltersContent({
  filters,
  handleFilterChange,
}: Props) {
  const {
    municipalities,
    error: errorAllMunicipalities,
    isLoading: isLoadingAllMunicipalities,
    fetchMunicipalities,
  } = useAllMunicipalities();

  const {
    provinces,
    error: errorAllProvinces,
    isLoading: isLoadingAllProvinces,
    fetchProvinces,
  } = useAllProvinces();

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField
        label="Buscar"
        variant="outlined"
        value={filters.search}
        onChange={(e) => handleFilterChange({ search: e.target.value })}
      />
      <SelectInputFilterFetcher
        value={filters.provinceId}
        options={provinces}
        error={errorAllProvinces}
        isLoading={isLoadingAllProvinces}
        fetcher={fetchProvinces}
        label="Provincia"
        onChange={(e) =>
          handleFilterChange({
            provinceId:
              e.target.value === "" ? undefined : Number(e.target.value),
          })
        }
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
