"use client";
import { TableMenu } from "@/components/common/menu";
import RootDataGrid from "@/components/common/tabel/RootDataGrid";
import { ModalContext } from "@/components/partials/Modal/context/ModalContext";
import { modalTypes } from "@/components/partials/Modal/types/modalTypes";
import { InventoryEntry } from "@/lib/types/inventory";
import { Pagination } from "@/lib/types/pagination";
import { Provider } from "@/lib/types/provider";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { FunctionComponent, useContext } from "react";

type ProviderListProps = {
  providers: Provider[];
  pagination: Pagination;
};

export const ProviderList: FunctionComponent<ProviderListProps> = ({
  providers,
  pagination,
}) => {
  const { handleOpenModal } = useContext(ModalContext);
  const onDelete = (params: GridRenderCellParams) => () => {
    handleOpenModal(modalTypes.providers.delete.name, params.row.id);
  };
  const onEdit = (params: GridRenderCellParams) => () => {
    handleOpenModal(modalTypes.providers.form.name, params.row.id);
  };

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
      renderCell: (params) => (
        <TableMenu onDelete={onDelete(params)} onEdit={onEdit(params)} />
      ),
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
