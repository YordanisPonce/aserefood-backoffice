"use client";
import { TableMenu } from "@/components/common/menu";
import RootDataGrid from "@/components/common/tabel/RootDataGrid";
import { modalTypes } from "@/components/partials/Modal/types/modalTypes";
import { Pagination } from "@/lib/types/pagination";
import { Zone } from "@/lib/types/zone";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { FunctionComponent, useContext } from "react";
import ZonesFilters from "./Filters/ZonesFilters";
import { ModalContext } from "@/components/partials/Modal/context/ModalContext";

type ZonesListProps = {
  zones: Zone[];
  pagination: Pagination;
};

export const ZonesList: FunctionComponent<ZonesListProps> = ({
  zones,
  pagination,
}) => {
  const { handleOpenModal } = useContext(ModalContext);

  const onViewDetails = (params: GridRenderCellParams) => () => {
    handleOpenModal(modalTypes.zones.details.name, params.row.id);
  };

  const onDelete = (params: GridRenderCellParams) => () => {
    handleOpenModal(modalTypes.zones.delete.name, params.row.id);
  };

  const onEdit = (params: GridRenderCellParams) => () => {
    handleOpenModal(modalTypes.zones.form.name, params.row.id);
  };

  const colDef: GridColDef<Zone>[] = [
    {
      field: "name",
      headerName: "Nombre",
      sortable: false,
      flex: 1,
    },
    {
      field: "description",
      headerName: "Descripción",
      sortable: false,
      flex: 1,
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
      data={zones}
      pagination={pagination}
      disableSelection
      filters={<ZonesFilters />}
    />
  );
};
