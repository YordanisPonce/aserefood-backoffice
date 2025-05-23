"use client";
import { TableMenu } from "@/components/common/menu";
import RootDataGrid from "@/components/common/tabel/RootDataGrid";
import { modalTypes } from "@/components/partials/Modal/types/modalTypes";
import { InventoryEntry } from "@/lib/types/inventory";
import { Pagination } from "@/lib/types/pagination";
import { fCurrency } from "@/lib/utils/formatter";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { FunctionComponent, useContext } from "react";
import InventoryEntriesFilters from "./Filters/InventoryEntriesFilters";
import { ModalContext } from "@/components/partials/Modal/context/ModalContext";

type InventoryListProps = {
  inventoryEntries: InventoryEntry[];
  pagination: Pagination;
};

export const InventoryList: FunctionComponent<InventoryListProps> = ({
  inventoryEntries,
  pagination,
}) => {
  const { handleOpenModal } = useContext(ModalContext);

  const onViewDetails = (params: GridRenderCellParams) => () => {
    handleOpenModal(modalTypes.inventory.details.name, params.row.id);
  };

  const onDelete = (params: GridRenderCellParams) => () => {
    handleOpenModal(modalTypes.inventory.delete.name, params.row.id);
  };

  const onEdit = (params: GridRenderCellParams) => () => {
    handleOpenModal(modalTypes.inventory.form.name, params.row.id);
  };

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
      renderCell: params => fCurrency(Number(params.value)),
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
      renderCell: params => (
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
      data={inventoryEntries}
      pagination={pagination}
      disableSelection
      getRowClassName={params => {
        return params.row.quantity != 0 ? "" : "row-inactive";
      }}
      sx={{
        "& .row-inactive": {
          backgroundColor: "#ffebee", // light red
          color: "#b71c1c", // dark red
        },
      }}
      filters={<InventoryEntriesFilters />}
      withoutSearch
    />
  );
};
