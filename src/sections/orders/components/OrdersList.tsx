"use client";
import { TableMenu } from "@/components/common/menu";
import RootDataGrid from "@/components/common/tabel/RootDataGrid";
import useModal from "@/components/partials/Modal/hooks/useModal";
import { modalTypes } from "@/components/partials/Modal/types/modalTypes";
import {
  Order,
  orderPaymentSelectionMap,
  orderStatusColorMap,
  orderStatusMap,
} from "@/lib/types/order";
import { Pagination } from "@/lib/types/pagination";
import { Chip } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { FunctionComponent } from "react";

type OrdersListProps = {
  orders: Order[];
  pagination: Pagination;
};

export const OrdersList: FunctionComponent<OrdersListProps> = ({
  orders,
  pagination,
}) => {
  const { handleOpenModal } = useModal();
  const onEdit = (params: GridRenderCellParams) => () => {
    handleOpenModal(modalTypes.orders.form.name, params.row.id);
  };
  const onViewDetails = (params: GridRenderCellParams) => () => {
    handleOpenModal(modalTypes.orders.details.name, params.row.id);
  };

  const colDef: GridColDef<Order>[] = [
    { field: "code", headerName: "Código", sortable: false, flex: 1 },
    {
      field: "municipalityName",
      headerName: "Municipio",
      sortable: false,
      flex: 2,
    },
    {
      field: "status",
      headerName: "Estado",
      sortable: false,
      flex: 0.8,
      renderCell: ({ row }) => (
        <Chip
          label={orderStatusMap.get(row.status)}
          variant="filled"
          color={orderStatusColorMap.get(row.status)}
        />
      ),
    },
    {
      field: "createdDate",
      headerName: "Fecha de creada",
      sortable: false,
      flex: 0.8,
      renderCell: ({ row }) => new Date(row.createdDate).toDateString(),
    },
    {
      field: "updatedDate",
      headerName: "Fecha de Actualización",
      sortable: false,
      flex: 0.8,
      renderCell: ({ row }) => new Date(row.updatedDate).toDateString(),
    },
    {
      field: "paymentSelection",
      headerName: "Método de Pago",
      sortable: false,
      flex: 0.8,
      renderCell: ({ row }) => (
        <Chip
          label={orderPaymentSelectionMap.get(row.paymentSelection)}
          variant="filled"
        />
      ),
    },
    {
      field: "totalAmount",
      headerName: "Monto total",
      sortable: false,
      flex: 0.8,
    },
    {
      field: "id",
      headerName: "Acciones",
      renderCell: (params) => (
        <TableMenu
          onEdit={onEdit(params)}
          onViewDetails={onViewDetails(params)}
        />
      ),
    },
  ];

  return (
    <RootDataGrid
      columns={colDef}
      data={orders}
      pagination={pagination}
      disableSelection
    />
  );
};
