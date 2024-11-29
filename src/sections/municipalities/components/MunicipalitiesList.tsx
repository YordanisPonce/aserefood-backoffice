"use client";
import { TableMenu } from "@/components/common/menu";
import RootDataGrid from "@/components/common/tabel/RootDataGrid";
import useModal from "@/components/partials/Modal/hooks/useModal";
import { modalTypes } from "@/components/partials/Modal/types/modalTypes";
import { Municipality } from "@/lib/types/municipality";
import { Pagination } from "@/lib/types/pagination";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { FunctionComponent } from "react";

type MunicipalitiesListProps = {
  municipalities: Municipality[];
  pagination: Pagination;
};

export const MunicipalitiesList: FunctionComponent<MunicipalitiesListProps> = ({
  municipalities,
  pagination,
}) => {
  const { handleOpenModal } = useModal();
  const onDelete = (params: GridRenderCellParams) => () => {};
  const onEdit = (params: GridRenderCellParams) => () => {
    handleOpenModal(modalTypes.municipalities.form.name, params.row.id);
  };

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
      renderCell: (params) => (
        <TableMenu onDelete={onDelete(params)} onEdit={onEdit(params)} />
      ),
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
