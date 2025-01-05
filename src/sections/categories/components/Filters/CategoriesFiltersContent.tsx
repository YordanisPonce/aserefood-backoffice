import SelectInputFilterFetcher from "@/components/common/input/SelectInputFilterFetcher";
import { Box } from "@mui/material";
import React from "react";
import useAllCategories from "../../hooks/useAllCategories";
import { CategoriesFilters } from "@/lib/types/category";

interface Props {
  filters: CategoriesFilters;
  handleFilterChange: (filters: CategoriesFilters) => void;
}

export default function CategoriesFiltersContent({
  filters,
  handleFilterChange,
}: Props) {
  const {
    categories,
    error: errorAllCategories,
    isLoading: isLoadingAllCategories,
    fetchCategories,
  } = useAllCategories();

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <SelectInputFilterFetcher
        value={filters.parentId}
        options={categories}
        error={errorAllCategories}
        isLoading={isLoadingAllCategories}
        fetcher={fetchCategories}
        label="Categoría Padre"
        onChange={(e) =>
          handleFilterChange({
            parentId:
              e.target.value === "" ? undefined : Number(e.target.value),
          })
        }
      />
    </Box>
  );
}
