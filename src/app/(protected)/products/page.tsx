import { getProducts } from "@/lib/services/products";
import { SearchParams } from "@/lib/types/pagination";
import { ProductList } from "@/sections/products/ProductList";
import { Box } from "@mui/material";
import React from "react";

type ProductsPageProps = {
  searchParams: SearchParams;
};
export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { data, page, total, pageSize } = await getProducts(searchParams);

  return (
    <Box sx={{ mt: 4, maxWidth: "100%" }}>
      <ProductList pagination={{ page, total, pageSize }} products={data} />
    </Box>
  );
}
