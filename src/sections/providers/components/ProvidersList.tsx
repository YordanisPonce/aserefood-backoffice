"use client";
import { TableMenu } from "@/components/common/menu";
import RootDataGrid from "@/components/common/tabel/RootDataGrid";
import { InventoryEntry } from "@/lib/types/inventory";
import { Pagination } from "@/lib/types/pagination";
import { Provider } from "@/lib/types/provider";
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
    <RootDataGrid
      columns={colDef}
      data={providers}
      pagination={pagination}
      disableSelection
    />
  );
};
