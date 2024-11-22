"use client"
import useProducts from "@/components/hooks/useProducts";
import AppBarSections from "@/components/partials/AppBarSections/AppBarSections";
import CardList from "@/components/partials/CardList/CardList";
import ProductCard from "@/components/partials/CardList/ProductCard/ProductCard";
import Filters from "@/components/partials/Filters/Filters";
import GenericTable from "@/components/partials/GenericTable/GenericTable";
import { BoolColumn } from "@/components/partials/GenericTable/types/BoolColumn";
import { Column } from "@/components/partials/GenericTable/types/Column";
import { ListColumn } from "@/components/partials/GenericTable/types/ListColumn";
import { TextColumn } from "@/components/partials/GenericTable/types/TextColumn";
import useProductsFilters from "@/components/partials/ProductsFilters/hooks/useProductsFilters";
import ProductsFilters from "@/components/partials/ProductsFilters/ProductsFilters";
import { ProductDTO } from "@/lib/dto/ProductDTO";
import { Box, Theme, useMediaQuery } from "@mui/material";
import React from "react";

const columns: Column<ProductDTO>[] = [
  new TextColumn("name", "Nombre"),
  new TextColumn("shortDescription", "Breve Descripción"),
  new TextColumn("description", "Despripción"),
  new TextColumn("categoryName", "Categoría"),
  new BoolColumn( "isService", "Servicio", false, "Disponible", "No disponible"),
  new ListColumn("providers", "Proveedores", false, "name")
];

export default function ProductsPage() {
  const { products } = useProducts();
  // get the context filters
  const { filters, handleApply, handleFilterChange, handleReset } =
    useProductsFilters();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const filtersProducts = (
    <Filters
      contentFilters={
        <ProductsFilters
          filters={filters}
          handleFilterChange={handleFilterChange}
        />
      }
      handleApply={handleApply}
      handleReset={handleReset}
    />
  );
  return (
    <>
      <AppBarSections title="Gestión de Productos" />

      <Box sx={{ mt: 4, maxWidth: "100%" }}>
        {isMobile ? (
          // Mobile View
          <CardList
            items={products}
            CardComponent={ProductCard}
            onAddCard={() => {}}
            filters={filtersProducts}
          />
        ) : (
          // Desktop View
          <GenericTable
            columns={columns}
            rows={products}
            onRowEdit={(row) => console.log("Edit", row)}
            onRowDelete={(row) => console.log("Delete", row)}
            title="Usuarios"
            filters={filtersProducts}
          />
        )}
      </Box>
    </>
  );
}
