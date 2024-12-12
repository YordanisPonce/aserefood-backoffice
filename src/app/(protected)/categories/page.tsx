import { SearchParams } from "@/lib/types/pagination";
import { Paper } from "@mui/material";
import React from "react";
import SectionHeader from "@/components/partials/SectionHeader/SectionHeader";
import Modal from "@/components/partials/Modal/Modal";
import { CategoryList } from "@/sections/categories/components/CategoriesList";
import { getCategories } from "@/lib/services/categories";
import { CategoryFormContainer } from "@/sections/categories/containers/CategoryFormContainer";
import { modalTypes } from "@/components/partials/Modal/types/modalTypes";
import CategoryDetailsContainer from "@/sections/categories/containers/CategoryDetailsContainer/CategoryDetailsContainer";
import DeleteEntityContainer from "@/components/containers/DeleteEntityContainer";

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
        createAction={modalTypes.categories.form.name}
      />
      <CategoryList pagination={{ page, total, pageSize }} categories={data} />
      <Modal
        formPath={[
          modalTypes.categories.form.name,
          modalTypes.subcategories.form.name,
        ]}
        titleModal={modalTypes.categories.form.title}
      >
        <CategoryFormContainer />
      </Modal>
      <Modal
        formPath={[modalTypes.categories.details.name]}
        titleModal={modalTypes.categories.details.title}
      >
        <CategoryDetailsContainer />
      </Modal>
      <Modal
        formPath={[modalTypes.categories.delete.name]}
        titleModal={modalTypes.categories.delete.title}
      >
        <DeleteEntityContainer
          message={modalTypes.categories.delete.message}
          title={modalTypes.categories.delete.subTitle}
        />
      </Modal>
    </Paper>
  );
}

export const dynamic = "force-dynamic";
