import SelectInputFilterFetcher from "@/components/common/input/SelectInputFilterFetcher";
import { Box } from "@mui/material";
import React from "react";
import useAllProducts from "@/sections/products/hooks/useAllProducts";
import useAllZones from "@/sections/zones/hooks/useAllZones";
import { InventoryEntriesFilters } from "@/lib/types/inventory";

interface Props {
  filters: InventoryEntriesFilters;
  handleFilterChange: (filters: InventoryEntriesFilters) => void;
}

export default function InventoryEntriesFiltersContent({
  filters,
  handleFilterChange,
}: Props) {
  const {
    zones,
    error: errorAllZones,
    isLoading: isLoadingAllZones,
    fetchZones,
  } = useAllZones();

  const {
    products,
    error: errorAllProducts,
    isLoading: isLoadingAllProducts,
    fetchProducts,
  } = useAllProducts();

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <SelectInputFilterFetcher
        value={filters.zoneId}
        options={zones}
        error={errorAllZones}
        isLoading={isLoadingAllZones}
        fetcher={fetchZones}
        label="Zona"
        onChange={(e) =>
          handleFilterChange({
            zoneId:
              e.target.value === "" ? undefined : Number(e.target.value),
          })
        }
      />
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
    </Box>
  );
}
