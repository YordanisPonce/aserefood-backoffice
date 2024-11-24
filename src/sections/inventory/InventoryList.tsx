"use client";

import { TableMenu } from "@/components/common/menu";
import RootDataGrid from "@/components/common/tabel/RootDataGrid";
import SectionHeader from "@/components/partials/SectionHeader/SectionHeader";
import { InventoryEntry } from "@/lib/types/inventory";
import { Pagination } from "@/lib/types/pagination";
import { fCurrency } from "@/lib/utils/formatter";
import { Paper } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { FunctionComponent } from "react";

type InventoryListProps = {
  inventoryEntries: InventoryEntry[];
  pagination: Pagination;
};

export const InventoryList: FunctionComponent<InventoryListProps> = ({
  inventoryEntries,
  pagination,
}) => {
  const onViewDetails = () => {};
  const onDelete = () => {};
  const onEdit = () => {};
  const colDef: GridColDef<InventoryEntry>[] = [
    {
      field: "productName",
      headerName: "Nombre del producto",
      sortable: false,
      flex: 1,
    },
    {
      field: "zoneName",
      headerName: "Nombre de la Zona",
      sortable: false,
      flex: 1,
    },
    {
      field: "price",
      headerName: "Precio",
      sortable: false,
      flex: 1,
      renderCell: (params) => fCurrency(Number(params.value)),
    },
    {
      field: "quantity",
      headerName: "Cantidad",
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
        titleSection="Inventario"
        titleButton="Crear Inventario"
        actionCreate={() => {
          // implement
        }}
      />
      <RootDataGrid
        columns={colDef}
        data={inventoryEntries}
        pagination={pagination}
        disableSelection
      />
    </Paper>
  );
};
