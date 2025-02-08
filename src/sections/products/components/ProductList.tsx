"use client";
import { TableMenu } from "@/components/common/menu";
import RootDataGrid from "@/components/common/tabel/RootDataGrid";
import { modalTypes } from "@/components/partials/Modal/types/modalTypes";
import { Pagination } from "@/lib/types/pagination";
import { Product } from "@/lib/types/products";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { FunctionComponent, useContext } from "react";
import ProductsFilters from "./Filters/ProductsFilters";
import { ModalContext } from "@/components/partials/Modal/context/ModalContext";

type ProductListProps = {
  products: Product[];
  pagination: Pagination;
};

export const ProductList: FunctionComponent<ProductListProps> = ({
  products,
  pagination,
}) => {
  const { handleOpenModal } = useContext(ModalContext);
  const onViewDetails = (params: GridRenderCellParams) => () => {
    handleOpenModal(modalTypes.products.details.name, params.row.id);
  };
  const onDelete = (params: GridRenderCellParams) => () => {
    handleOpenModal(modalTypes.products.delete.name, params.row.id);
  };
  const onEdit = (params: GridRenderCellParams) => () => {
    handleOpenModal(modalTypes.products.form.name, params.row.id);
  };

  const colDef: GridColDef<Product>[] = [
    { field: "name", headerName: "Nombre", sortable: false, flex: 1 },
    {
      field: "shortDescription",
      headerName: "Descipción corta",
      sortable: false,
      flex: 2,
    },
    {
      field: "description",
      headerName: "Descipción larga",
      sortable: false,
      flex: 2,
    },
    {
      field: "id",
      headerName: "Acciones",
      renderCell: (params) => (
        <TableMenu
          onDelete={onDelete(params)}
          onEdit={onEdit(params)}
          onViewDetails={onViewDetails(params)}
        />
      ),
    },
  ];

  return (
    <RootDataGrid
      columns={colDef}
      data={products}
      pagination={pagination}
      disableSelection
      filters={<ProductsFilters />}
    />
  );
};
