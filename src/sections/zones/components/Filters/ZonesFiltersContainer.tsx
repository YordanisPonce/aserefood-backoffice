import { Box } from "@mui/material";
import React from "react";
import { ZonesFilters } from "@/lib/types/zone";
import useAllMunicipalities from "@/sections/municipalities/hooks/useAllMunicipalities";
import useAllProvinces from "@/sections/provinces/hooks/useAllProvinces";
import SelectInputFilterFetcher from "@/components/common/input/SelectInputFilterFetcher";

interface Props {
  filters: ZonesFilters;
  handleFilterChange: (filters: ZonesFilters) => void;
}

export default function ZonesFiltersContent({
  filters,
  handleFilterChange,
}: Props) {
  const {
    municipalities,
    error: ErrorAllMunicipalities,
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
        error={ErrorAllMunicipalities}
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
