"use client";
import { TableMenu } from "@/components/common/menu";
import RootDataGrid from "@/components/common/tabel/RootDataGrid";
import useModal from "@/components/partials/Modal/hooks/useModal";
import { modalTypes } from "@/components/partials/Modal/types/modalTypes";
import { Pagination } from "@/lib/types/pagination";
import { Promotion, promotionsDiscountOptionMap } from "@/lib/types/promotion";
import { Chip } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { FunctionComponent } from "react";

type PromotionsListProps = {
  promotions: Promotion[];
  pagination: Pagination;
};

export const PromotionsList: FunctionComponent<PromotionsListProps> = ({
  promotions,
  pagination,
}) => {
  const { handleOpenModal } = useModal();
  const onViewDetails = (params: GridRenderCellParams) => () => {
    handleOpenModal(modalTypes.promotions.details.name, params.row.id);
  };
  const onDelete = (params: GridRenderCellParams) => () => {
    handleOpenModal(modalTypes.promotions.delete.name, params.row.id);
  };
  const onEdit = (params: GridRenderCellParams) => () => {
    handleOpenModal(modalTypes.promotions.form.name, params.row.id);
  };

  const colDef: GridColDef<Promotion>[] = [
    { field: "name", headerName: "Nombre", sortable: false, flex: 1 },
    { field: "code", headerName: "Código", sortable: false, flex: 1 },
    {
      field: "description",
      headerName: "Descipción",
      sortable: false,
      flex: 2,
    },
    {
      field: "discountOption",
      headerName: "Opción de Descuento",
      sortable: false,
      flex: 0.8,
      renderCell: ({ row }) => (
        <Chip
          label={promotionsDiscountOptionMap.get(row.discountOption)}
          variant="filled"
        />
      ),
    },
    {
      field: "discountValue",
      headerName: "Valor de Descuento",
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
          label={row.isActive ? "Activa" : "Inactiva"}
          variant="filled"
          color={row.isActive ? "primary" : "error"}
        />
      ),
    },
    {
      field: "startDate",
      headerName: "Fecha de Inicio",
      sortable: false,
      flex: 0.8,
      renderCell: ({ row }) => new Date(row.startDate).toDateString(),
    },
    {
      field: "endDate",
      headerName: "Fecha de Finalización",
      sortable: false,
      flex: 0.8,
      renderCell: ({ row }) => new Date(row.endDate).toDateString(),
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
      data={promotions}
      pagination={pagination}
      disableSelection
    />
  );
};
