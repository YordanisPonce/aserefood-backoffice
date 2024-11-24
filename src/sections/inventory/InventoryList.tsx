"use client";

import RootDataGrid from "@/components/common/tabel/RootDataGrid";
import { InventoryEntry } from "@/lib/types/inventory";
import { Pagination } from "@/lib/types/pagination";
import { fCurrency } from "@/lib/utils/formatter";
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
  ];

  return (
    <RootDataGrid
      columns={colDef}
      data={inventoryEntries}
      pagination={pagination}
      disableSelection
    />
  );
};
