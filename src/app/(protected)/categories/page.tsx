
import { SearchParams } from "@/lib/types/pagination";
import { Paper } from "@mui/material";
import React from "react";
import SectionHeader from "@/components/partials/SectionHeader/SectionHeader";
import Modal from "@/components/partials/Modal/Modal";
import { CategoryList } from "@/sections/categories/components/CategoriesList";
import { getCategories } from "@/lib/services/categories";
import { CategoryFormContainer } from "@/sections/categories/containers/CategoryFormContainer";

type CategoriesPageProps = {
  searchParams: SearchParams;
};
export default async function CategoriesPage({
  searchParams,
}: CategoriesPageProps) {
  const { data, page, total, pageSize } = await getCategories(searchParams);

  return (
    <Paper sx={{ p: 2 }}>
      <SectionHeader
        titleSection="Categorías"
        titleButton="Crear Categoría"
        createAction="form-category"
      />
      <CategoryList pagination={{ page, total, pageSize }} categories={data} />
      <Modal formPath="form-category" titleModal="Categoría">
        <CategoryFormContainer />
      </Modal>
      <Modal formPath="form-subCategory" titleModal="Categoría">
        <CategoryFormContainer />
      </Modal>
    </Paper>
  );
}

export const dynamic = "force-dynamic";
