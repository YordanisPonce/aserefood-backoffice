"use client";
import SectionFetchingDataError from "@/components/partials/Modal/components/SectionFetchingDataError";
import useCategoryAncestors from "@/sections/categories/hooks/useCategoryAncestors";
import { Category } from "@mui/icons-material";
import { Box, Chip, CircularProgress, Typography } from "@mui/material";
import React from "react";

interface Props {
  categoryId: string;
}

export default function ProductCategoriesSection({ categoryId }: Props) {
  const {
    ancestors,
    loadingData: loadingDataCategoryAncestors,
    error: errorCategoryAncestors,
    fetchCategoryAncestors,
  } = useCategoryAncestors({ categoryId: categoryId });

  return (
    <Box display="flex" alignItems="center" mb={2}>
      <Category sx={{ mr: 1 }} color="action" />
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
              reset={fetchCategoryAncestors}
            />
          )
        ) : (
          <CircularProgress size={10} />
        )}
      </Box>
    </Box>
  );
}
