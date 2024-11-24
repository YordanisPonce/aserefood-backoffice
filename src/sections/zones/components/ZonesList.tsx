"use client";
import { TableMenu } from "@/components/common/menu";
import RootDataGrid from "@/components/common/tabel/RootDataGrid";
import { Pagination } from "@/lib/types/pagination";
import { Zone } from "@/lib/types/zone";
import { GridColDef } from "@mui/x-data-grid";
import { FunctionComponent } from "react";

type ZonesListProps = {
  zones: Zone[];
  pagination: Pagination;
};

export const ZonesList: FunctionComponent<ZonesListProps> = ({
  zones,
  pagination,
}) => {
  const onViewDetails = () => {};
  const onDelete = () => {};
  const onEdit = () => {};

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
      renderCell: () => <TableMenu {...{ onDelete, onEdit, onViewDetails }} />,
    },
  ];

  return (
    <RootDataGrid
      columns={colDef}
      data={zones}
      pagination={pagination}
      disableSelection
    />
  );
};
