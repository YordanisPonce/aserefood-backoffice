"use client";
import SectionFetchingDataError from "@/components/partials/Modal/components/SectionFetchingDataError";
import { Category } from "@/lib/types/category";
import useCategoriesAncestors from "@/sections/categories/hooks/useCategoriesAncestors";
import useCategoryAncestors from "@/sections/categories/hooks/useCategoryAncestors";
import { Category as CategoryIcon } from "@mui/icons-material";
import { Box, Chip, CircularProgress, Typography } from "@mui/material";
import React from "react";

interface Props {
  categories: Category[];
}

export default function ProductCategoriesSection({ categories }: Props) {
  const {
    ancestors,
    loadingData: loadingDataCategoryAncestors,
    error: errorCategoryAncestors,
    fetchCategoriesAncestors,
  } = useCategoriesAncestors({ categories });

  return (
    <Box display="flex" alignItems="center" mb={2}>
      <CategoryIcon sx={{ mr: 1 }} color="action" />
      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="body2">Categorias:</Typography>
        {!loadingDataCategoryAncestors ? (
          !errorCategoryAncestors ? (
            <Box display="flex" flexWrap="wrap" gap={1}>
              {ancestors.map((category) => (
                <Chip
                  label={category.name}
                  key={category.id}
                  size="small"
                  variant="filled"
                  color={"secondary"}
                />
              ))}
            </Box>
          ) : (
            <SectionFetchingDataError
              label="volver a cargar categorías"
              reset={fetchCategoriesAncestors}
            />
          )
        ) : (
          <CircularProgress size={10} />
        )}
      </Box>
    </Box>
  );
}
