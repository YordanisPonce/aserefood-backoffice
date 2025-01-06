import SelectInputFilterFetcher from "@/components/common/input/SelectInputFilterFetcher";
import { ProductCombosFilters } from "@/lib/types/productCombo";
import useAllProducts from "@/sections/products/hooks/useAllProducts";
import useAllZones from "@/sections/zones/hooks/useAllZones";
import { Box } from "@mui/material";
import React from "react";
import useProductsCombosStatesOptions from "./hooks/useProductCombosStatesOptions";
import SelectInputFilter from "@/components/common/input/SelectInputFilter";

interface Props {
  filters: ProductCombosFilters;
  handleFilterChange: (filters: ProductCombosFilters) => void;
}

export default function ProductCombosFiltersContent({
  filters,
  handleFilterChange,
}: Props) {
  const {
    products,
    error: errorAllProducts,
    isLoading: isLoadingAllProducts,
    fetchProducts,
  } = useAllProducts();

  const {
    zones,
    error: errorAllZones,
    isLoading: isLoadingAllZones,
    fetchZones,
  } = useAllZones();

  const { productCombosStates, selectState } = useProductsCombosStatesOptions({
    isActive: filters.isActive,
  });

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <SelectInputFilterFetcher
        value={filters.productId}
        options={products}
        error={errorAllProducts}
        isLoading={isLoadingAllProducts}
        fetcher={fetchProducts}
        label="Producto"
        onChange={(e) =>
          handleFilterChange({
            productId:
              e.target.value === "" ? undefined : Number(e.target.value),
          })
        }
      />
      <SelectInputFilterFetcher
        value={filters.zoneId}
        options={zones}
        error={errorAllZones}
        isLoading={isLoadingAllZones}
        fetcher={fetchZones}
        label="Zona"
        onChange={(e) =>
          handleFilterChange({
            zoneId: e.target.value === "" ? undefined : Number(e.target.value),
          })
        }
      />
      <SelectInputFilter
        value={selectState}
        label="Estado del Combo"
        options={productCombosStates}
        onChange={(e) => {
          const value = Number(e.target.value);
          handleFilterChange({
            isActive: value === 0 ? undefined : value === 1 ? true : false,
          });
        }}
      />
    </Box>
  );
}
