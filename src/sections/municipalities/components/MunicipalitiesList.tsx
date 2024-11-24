"use client";
import { TableMenu } from "@/components/common/menu";
import RootDataGrid from "@/components/common/tabel/RootDataGrid";
import { Municipality } from "@/lib/types/municipality";
import { Pagination } from "@/lib/types/pagination";
import { GridColDef } from "@mui/x-data-grid";
import { FunctionComponent } from "react";

type MunicipalitiesListProps = {
  municipalities: Municipality[];
  pagination: Pagination;
};

export const MunicipalitiesList: FunctionComponent<MunicipalitiesListProps> = ({
  municipalities,
  pagination,
}) => {
  const onViewDetails = () => {};
  const onDelete = () => {};
  const onEdit = () => {};

  const colDef: GridColDef<Municipality>[] = [
    { field: "name", headerName: "Nombre", sortable: false, flex: 1 },
    {
      field: "provinceName",
      headerName: "Provincia",
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
      data={municipalities}
      pagination={pagination}
      disableSelection
    />
  );
};
