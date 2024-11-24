"use client";
import { TableMenu } from "@/components/common/menu";
import RootDataGrid from "@/components/common/tabel/RootDataGrid";
import SectionHeader from "@/components/partials/SectionHeader/SectionHeader";
import { InventoryEntry } from "@/lib/types/inventory";
import { Pagination } from "@/lib/types/pagination";
import { Provider } from "@/lib/types/provider";
import { Paper } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { FunctionComponent } from "react";

type ProviderListProps = {
  providers: Provider[];
  pagination: Pagination;
};

export const ProviderList: FunctionComponent<ProviderListProps> = ({
  providers,
  pagination,
}) => {
  const onViewDetails = () => {};
  const onDelete = () => {};
  const onEdit = () => {};

  const colDef: GridColDef<InventoryEntry>[] = [
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
      <SectionHeader titleSection="Proveedores" titleButton="Crear Proveedor" />
      <RootDataGrid
        columns={colDef}
        data={providers}
        pagination={pagination}
        disableSelection
      />
    </Paper>
  );
};
