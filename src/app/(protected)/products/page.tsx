import { getProducts } from "@/lib/services/products";
import { ProductList } from "@/sections/products/components/ProductList";
import { Paper } from "@mui/material";
import React from "react";
import SectionHeader from "@/components/partials/SectionHeader/SectionHeader";
import Modal from "@/components/partials/Modal/Modal";
import { ProductFormContainer } from "@/sections/products/containers/ProductFormContainer";
import { modalTypes } from "@/components/partials/Modal/types/modalTypes";
import ProductDetailsContainer from "@/sections/products/containers/ProductDetailsContainer/ProductDetailsContainer";
import DeleteEntityContainer from "@/components/containers/DeleteEntityContainer";
import { ProductsFilters } from "@/lib/types/products";



type ProductsPageProps = {
  searchParams: ProductsFilters;
};
export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { data, page, total, pageSize } = await getProducts(searchParams);

  return (
    <Paper sx={{ p: 2 }}>
      <SectionHeader
        titleSection="Productos"
        titleButton="Gestión de Producto"
        createAction={modalTypes.products.form.name}
      />
      <ProductList pagination={{ page, total, pageSize }} products={data} />
      <Modal
        formPath={[modalTypes.products.form.name]}
        titleModal={modalTypes.products.form.title}
      >
        <ProductFormContainer />
      </Modal>
      <Modal
        formPath={[modalTypes.products.details.name]}
        titleModal={modalTypes.products.details.title}
      >
        <ProductDetailsContainer />
      </Modal>
      <Modal
        formPath={[modalTypes.products.delete.name]}
        titleModal={modalTypes.products.delete.title}
      >
        <DeleteEntityContainer
          message={modalTypes.products.delete.message}
          title={modalTypes.products.delete.subTitle}
        />
      </Modal>
    </Paper>
  );
}

export const dynamic = "force-dynamic";
