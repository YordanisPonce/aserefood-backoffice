"use client";

import { TableMenu } from "@/components/common/menu";
import RootDataGrid from "@/components/common/tabel/RootDataGrid";
import useModal from "@/components/partials/Modal/hooks/useModal";
import useUrlParams from "@/lib/hooks/useUrlParams";
import { Pagination } from "@/lib/types/pagination";
import { Product } from "@/lib/types/products";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { FunctionComponent } from "react";

type ProductListProps = {
  products: Product[];
  pagination: Pagination;
};

export const ProductList: FunctionComponent<ProductListProps> = ({
  products,
  pagination,
}) => {
  const { updateSearchParams } = useUrlParams();
  const { handleOpenModal } = useModal();
  const onViewDetails = (params: GridRenderCellParams) => () => {
    updateSearchParams({
      currentModal: {
        action: "set",
        value: "view-product",
      },
      productId: {
        action: "set",
        value: params.row.id,
      },
    });
  };
  const onDelete = (params: GridRenderCellParams) => () => {
    updateSearchParams({
      currentModal: {
        action: "set",
        value: "delete-entity",
      },
      id: {
        action: "set",
        value: params.row.id,
      },
    });
  };
  const onEdit = (params: GridRenderCellParams) => () => {
    handleOpenModal("modal-product", params.row.id);
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
    />
  );
};
