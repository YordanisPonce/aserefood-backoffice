import SelectInputFilterFetcher from "@/components/common/input/SelectInputFilterFetcher";
import useAllProducts from "@/sections/products/hooks/useAllProducts";
import { Box } from "@mui/material";
import React from "react";
import SelectInputFilter from "@/components/common/input/SelectInputFilter";
import { PromotionsFilters } from "@/lib/types/promotion";
import useAllProductCombos from "@/sections/product-combos/hooks/useAllProductCombos";
import usePromotionsStatesOptions from "./hooks/usePromotionsStatesOptions";

interface Props {
  filters: PromotionsFilters;
  handleFilterChange: (filters: PromotionsFilters) => void;
}

export default function PromotionsFiltersContent({
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
    productCombos,
    error: errorAllProductCombos,
    isLoading: isLoadingAllProductCombos,
    fetchProductCombos,
  } = useAllProductCombos();

  const { promotionsStates, selectState } = usePromotionsStatesOptions({
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
        value={filters.productComboId}
        options={productCombos}
        error={errorAllProductCombos}
        isLoading={isLoadingAllProductCombos}
        fetcher={fetchProductCombos}
        label="Combo de producto"
        onChange={(e) =>
          handleFilterChange({
            productComboId:
              e.target.value === "" ? undefined : Number(e.target.value),
          })
        }
      />
      <SelectInputFilter
        value={selectState}
        label="Estado de la promoción"
        options={promotionsStates}
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
