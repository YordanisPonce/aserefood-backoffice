"use client";
import { TableMenu } from "@/components/common/menu";
import RootDataGrid from "@/components/common/tabel/RootDataGrid";
import { Pagination } from "@/lib/types/pagination";
import { Province } from "@/lib/types/province";
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
    <RootDataGrid
      columns={colDef}
      data={providers}
      pagination={pagination}
      disableSelection
    />
  );
};
