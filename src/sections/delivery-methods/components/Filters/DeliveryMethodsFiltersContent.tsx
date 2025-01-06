import SelectInputFilter from "@/components/common/input/SelectInputFilter";
import SelectInputFilterFetcher from "@/components/common/input/SelectInputFilterFetcher";
import { DeliveryMethodsFilters } from "@/lib/types/deliveryMethod";
import useAllMunicipalities from "@/sections/municipalities/hooks/useAllMunicipalities";
import useAllProvinces from "@/sections/provinces/hooks/useAllProvinces";
import { Box } from "@mui/material";
import React from "react";
import useDeliveryMethodsStatesOptions from "./hooks/useDeliveryMethodsStatesOptions";

interface Props {
  filters: DeliveryMethodsFilters;
  handleFilterChange: (filters: DeliveryMethodsFilters) => void;
}

export default function DeliveryMethodsFiltersContent({
  filters,
  handleFilterChange,
}: Props) {
  const {
    provinces,
    error: errorAllProvinces,
    isLoading: isLoadingAllProvinces,
    fetchProvinces,
  } = useAllProvinces();
  const {
    municipalities,
    error: errorAllMunicipalities,
    isLoading: isLoadingAllMunicipalities,
    fetchMunicipalities,
  } = useAllMunicipalities();
  const { deliveryMethodsStates, selectState } =
    useDeliveryMethodsStatesOptions({ isFree: filters.isFree });
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
      <SelectInputFilter
        value={selectState}
        label="Estado del método de entrega"
        options={deliveryMethodsStates}
        onChange={(e) => {
          const value = Number(e.target.value);
          handleFilterChange({
            isFree: value === 0 ? undefined : value === 1 ? true : false,
          });
        }}
      />
    </Box>
  );
}
