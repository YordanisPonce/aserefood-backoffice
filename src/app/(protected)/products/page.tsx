import { getProducts } from "@/lib/services/products";
import { SearchParams } from "@/lib/types/pagination";
import { ProductList } from "@/sections/products/components/ProductList";
import { Paper } from "@mui/material";
import React from "react";
import { AddProductContainer } from "@/sections/products/containers/AddProductContainer";
import SectionHeader from "@/components/partials/SectionHeader/SectionHeader";

type ProductsPageProps = {
  searchParams: SearchParams;
};
export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { data, page, total, pageSize } = await getProducts(searchParams);

  return (
    <Paper sx={{ p: 2 }}>
      <SectionHeader
        titleSection="Productos"
        titleButton="Crear Producto"
        createAction="create-product"
      />
      <ProductList pagination={{ page, total, pageSize }} products={data} />
      <AddProductContainer currentModal={searchParams.currentModal} />
    </Paper>
  );
}

export const dynamic = "force-dynamic";
