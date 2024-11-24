import { getProducts } from "@/lib/services/products";
import { SearchParams } from "@/lib/types/pagination";
import { ProductList } from "@/sections/products/components/ProductList";
import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import { Add as AddIcon } from "@mui/icons-material";
import { AddProductContainer } from "@/sections/products/containers/AddProductContainer";

type ProductsPageProps = {
  searchParams: SearchParams;
};
export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { data, page, total, pageSize } = await getProducts(searchParams);

  return (
    <Paper sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexDirection: "row",
          mb: 2,
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          textTransform="capitalize"
          color="text.primary"
          fontWeight="700"
        >
          Productos
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Crear Usuario
        </Button>
      </Box>
      <ProductList pagination={{ page, total, pageSize }} products={data} />
      <AddProductContainer />
    </Paper>
  );
}
