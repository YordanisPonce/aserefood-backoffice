"use client";
import { TableMenu } from "@/components/common/menu";
import RootDataGrid from "@/components/common/tabel/RootDataGrid";
import { ModalContext } from "@/components/partials/Modal/context/ModalContext";
import { modalTypes } from "@/components/partials/Modal/types/modalTypes";
import { Pagination } from "@/lib/types/pagination";
import { Province } from "@/lib/types/province";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { FunctionComponent, useContext } from "react";

type ProvincesListProps = {
  providers: Province[];
  pagination: Pagination;
};

export const ProvincesList: FunctionComponent<ProvincesListProps> = ({
  providers,
  pagination,
}) => {
  const { handleOpenModal } = useContext(ModalContext);
  const onDelete = (params: GridRenderCellParams) => () => {
    handleOpenModal(modalTypes.provinces.delete.name, params.row.id);
  };
  const onEdit = (params: GridRenderCellParams) => () => {
    handleOpenModal(modalTypes.provinces.form.name, params.row.id);
  };

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
