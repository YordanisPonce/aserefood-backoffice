"use client";
import { TableMenu } from "@/components/common/menu";
import RootDataGrid from "@/components/common/tabel/RootDataGrid";
import SectionHeader from "@/components/partials/SectionHeader/SectionHeader";
import { Pagination } from "@/lib/types/pagination";
import { Province } from "@/lib/types/province";
import { Paper } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { FunctionComponent } from "react";

type ProvincesListProps = {
  providers: Province[];
  pagination: Pagination;
};

export const ProvincesList: FunctionComponent<ProvincesListProps> = ({
  providers,
  pagination,
}) => {
  const onViewDetails = () => {};
  const onDelete = () => {};
  const onEdit = () => {};

  const colDef: GridColDef<Province>[] = [
    {
      field: "name",
      headerName: "Nombre",
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
    <Paper sx={{ p: 2 }}>
      <SectionHeader
        titleSection="Provincias"
        titleButton="Crear Provincia"
        actionCreate={() => {
          // implement
        }}
      />
    <RootDataGrid
      columns={colDef}
      data={providers}
      pagination={pagination}
      disableSelection
    />
    </Paper>
  );
};
