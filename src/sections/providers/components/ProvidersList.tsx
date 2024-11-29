"use client";
import { TableMenu } from "@/components/common/menu";
import RootDataGrid from "@/components/common/tabel/RootDataGrid";
import useModal from "@/components/partials/Modal/hooks/useModal";
import { modalTypes } from "@/components/partials/Modal/types/modalTypes";
import { InventoryEntry } from "@/lib/types/inventory";
import { Pagination } from "@/lib/types/pagination";
import { Provider } from "@/lib/types/provider";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { FunctionComponent } from "react";

type ProviderListProps = {
  providers: Provider[];
  pagination: Pagination;
};

export const ProviderList: FunctionComponent<ProviderListProps> = ({
  providers,
  pagination,
}) => {
  const { handleOpenModal } = useModal();
  const onDelete = (params: GridRenderCellParams) => () => {};
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
        <TableMenu
          onDelete={onDelete(params)}
          onEdit={onEdit(params)}
        />
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
