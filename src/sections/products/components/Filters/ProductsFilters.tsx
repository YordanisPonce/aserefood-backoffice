import Filters from "@/components/partials/Filters/Filters";

import React from "react";
import useProductsFilters from "./hooks/useProductsFilters";

export default function ProductsFilters() {
  const { filters, handleChangeFilters, handleReset } = useProductsFilters();
  return (
    <Filters
      handleApply={() => {}}
      handleReset={handleReset}
      contentFilters={<>Los Filtros</>}
    />
  );
}
