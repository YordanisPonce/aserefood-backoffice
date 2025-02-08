"use client";
import { TableMenu } from "@/components/common/menu";
import RootDataGrid from "@/components/common/tabel/RootDataGrid";
import { modalTypes } from "@/components/partials/Modal/types/modalTypes";
import { Pagination } from "@/lib/types/pagination";
import { ProductCombo } from "@/lib/types/productCombo";
import { Chip } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { FunctionComponent, useContext } from "react";
import ProductCombosFilters from "./Filters/ProductCombosFilters";
import { ModalContext } from "@/components/partials/Modal/context/ModalContext";

type ProductCombosListProps = {
  productCombos: ProductCombo[];
  pagination: Pagination;
};

export const ProductCombosList: FunctionComponent<ProductCombosListProps> = ({
  productCombos,
  pagination,
}) => {
  const { handleOpenModal } = useContext(ModalContext);
  const onViewDetails = (params: GridRenderCellParams) => () => {
    handleOpenModal(modalTypes.productCombos.details.name, params.row.id);
  };
  const onDelete = (params: GridRenderCellParams) => () => {
    handleOpenModal(modalTypes.productCombos.delete.name, params.row.id);
  };
  const onEdit = (params: GridRenderCellParams) => () => {
    handleOpenModal(modalTypes.productCombos.form.name, params.row.id);
  };

  const colDef: GridColDef<ProductCombo>[] = [
    { field: "name", headerName: "Nombre", sortable: false, flex: 1 },
    {
      field: "shortDescription",
      headerName: "Descipción corta",
      sortable: false,
      flex: 2,
    },
    {
      field: "description",
      headerName: "Descipción",
      sortable: false,
      flex: 2,
    },
    {
      field: "price",
      headerName: "Precio",
      sortable: false,
      flex: 0.8,
    },
    {
      field: "referencePrice",
      headerName: "Precio de Referencia",
      sortable: false,
      flex: 0.8,
    },
    {
      field: "zoneName",
      headerName: "Zona",
      sortable: false,
      flex: 0.8,
    },
    {
      field: "isActive",
      headerName: "Estado",
      sortable: false,
      flex: 0.8,
      renderCell: ({ row }) => (
        <Chip
          label={row.isActive ? "Activo" : "Inactivo"}
          variant="filled"
          color={row.isActive ? "primary" : "error"}
        />
      ),
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
      data={productCombos}
      pagination={pagination}
      disableSelection
      filters={<ProductCombosFilters />}
    />
  );
};
