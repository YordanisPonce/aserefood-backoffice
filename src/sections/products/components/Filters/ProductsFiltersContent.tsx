import SelectInputFilter from "@/components/common/input/SelectInputFilter";
import SelectInputFilterFetcher from "@/components/common/input/SelectInputFilterFetcher";
import { ProductsFilters } from "@/lib/types/products";
import useAllProviders from "@/sections/providers/hooks/useAllProviders";
import { Box } from "@mui/material";
import React from "react";
import useProductsStatesOptions from "./hooks/useProductsStatesOptions";

interface Props {
  filters: ProductsFilters;
  handleFilterChange: (filters: ProductsFilters) => void;
}

export default function ProductsFiltersContent({
  filters,
  handleFilterChange,
}: Props) {
  const {
    providers,
    fetchProviders,
    error: errorAllProviders,
    isLoading: isLoadingAllProviders,
  } = useAllProviders();
  const { productsStates, selectState } =
    useProductsStatesOptions({ isService: filters.isService });
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <SelectInputFilterFetcher
        value={filters.providerId}
        options={providers}
        error={errorAllProviders}
        isLoading={isLoadingAllProviders}
        fetcher={fetchProviders}
        label="Proveedor"
        onChange={(e) =>
          handleFilterChange({
            providerId:
              e.target.value === "" ? undefined : Number(e.target.value),
          })
        }
      />

      <SelectInputFilter
        value={selectState}
        label="Estado del producto"
        options={productsStates}
        onChange={(e) => {
          const value = Number(e.target.value);
          handleFilterChange({
            isService: value === 0 ? undefined : value === 1 ? true : false,
          });
        }}
      />
    </Box>
  );
}
