"use client";
import { TableMenu } from "@/components/common/menu";
import RootDataGrid from "@/components/common/tabel/RootDataGrid";
import { modalTypes } from "@/components/partials/Modal/types/modalTypes";
import { DeliveryMethod } from "@/lib/types/deliveryMethod";
import { Pagination } from "@/lib/types/pagination";
import { Chip } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { FunctionComponent, useContext } from "react";
import DeliveryMethodsFilters from "./Filters/DeliveryMethodsFilters";
import { ModalContext } from "@/components/partials/Modal/context/ModalContext";

type DeliveryMethodsProps = {
  deliveryMethods: DeliveryMethod[];
  pagination: Pagination;
};

export const DeliveryMethodsList: FunctionComponent<DeliveryMethodsProps> = ({
  deliveryMethods,
  pagination,
}) => {
  const { handleOpenModal } = useContext(ModalContext);
  const onViewDetails = (params: GridRenderCellParams) => () => {
    handleOpenModal(modalTypes.deliveryMethods.details.name, params.row.id);
  };
  const onDelete = (params: GridRenderCellParams) => () => {
    handleOpenModal(modalTypes.deliveryMethods.delete.name, params.row.id);
  };
  const onEdit = (params: GridRenderCellParams) => () => {
    handleOpenModal(modalTypes.deliveryMethods.form.name, params.row.id);
  };

  const colDef: GridColDef<DeliveryMethod>[] = [
    { field: "name", headerName: "Nombre", sortable: false, flex: 1 },
    {
      field: "estimatedArrivalTime",
      headerName: "Tiempo de Entrega Estimado",
      sortable: false,
      flex: 2,
    },
    {
      field: "isFree",
      headerName: "Estado",
      sortable: false,
      flex: 2,
      renderCell: ({ row }) => (
        <Chip
          label={row.isFree ? "Gratis" : "De Pago"}
          variant="filled"
          color={row.isFree ? "primary" : "error"}
        />
      ),
    },
    {
      field: "pickUpDirection",
      headerName: "Dirección de Recorrida",
      sortable: false,
      flex: 0.8,
    },
    {
      field: "cost",
      headerName: "Costo",
      sortable: false,
      flex: 0.8,
    },
    {
      field: "minimalDeliveryPrice",
      headerName: "Precio mínimo de entrega",
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
      data={deliveryMethods}
      pagination={pagination}
      disableSelection
      filters={<DeliveryMethodsFilters />}
    />
  );
};
