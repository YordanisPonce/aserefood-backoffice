import SelectInputFilterFetcher from "@/components/common/input/SelectInputFilterFetcher";
import { MunicipalitiesFilters } from "@/lib/types/municipality";
import useAllProvinces from "@/sections/provinces/hooks/useAllProvinces";
import { Box } from "@mui/material";
import React from "react";

interface Props {
  filters: MunicipalitiesFilters;
  handleFilterChange: (filters: MunicipalitiesFilters) => void;
}

export default function MunicipalitiesFiltersContent({
  filters,
  handleFilterChange,
}: Props) {
  const {
    provinces,
    error: errorAllProvinces,
    isLoading: isLoadingAllProvinces,
    fetchProvinces,
  } = useAllProvinces();
  return (
    <Box display="flex" flexDirection="column" gap={2}>
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
    </Box>
  );
}
