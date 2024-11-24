"use client";

import { TableMenu } from "@/components/common/menu";
import RootDataGrid from "@/components/common/tabel/RootDataGrid";
import { Pagination } from "@/lib/types/pagination";
import { Product } from "@/lib/types/products";
import { GridColDef } from "@mui/x-data-grid";
import { FunctionComponent } from "react";

type ProductListProps = {
  products: Product[];
  pagination: Pagination;
};

export const ProductList: FunctionComponent<ProductListProps> = ({
  products,
  pagination,
}) => {
  const onViewDetails = () => {};
  const onDelete = () => {};
  const onEdit = () => {};

  const colDef: GridColDef<Product>[] = [
    { field: "name", headerName: "Nombre", sortable: false, flex: 1 },
    {
      field: "shortDescription",
      headerName: "Descipción corta",
      sortable: false,
      flex: 2,
    },
    {
      field: "longDescription",
      headerName: "Descipción larga",
      sortable: false,
      flex: 2,
    },
    {
      field: "categoryName",
      headerName: "Categoría",
      sortable: false,
      flex: 0.8,
    },
    {
      field: "id",
      headerName: "Acciones",
      renderCell: () => <TableMenu {...{ onDelete, onEdit, onViewDetails }} />,
    },
  ];

  return (
    <RootDataGrid
      columns={colDef}
      data={products}
      pagination={pagination}
      disableSelection
    />
  );
};
