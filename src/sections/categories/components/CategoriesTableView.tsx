"use client";

import { TableMenu } from "@/components/common/menu";
import RootDataGrid from "@/components/common/tabel/RootDataGrid";
import useModal from "@/components/partials/Modal/hooks/useModal";
import { modalTypes } from "@/components/partials/Modal/types/modalTypes";
import { Category } from "@/lib/types/category";
import { Pagination } from "@/lib/types/pagination";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface Props {
  categories: Category[];
  pagination: Pagination;
}

export default function CategoriesTableView({ categories, pagination }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { handleOpenModal } = useModal();

  useEffect(() => {
    const searchUrl = new URLSearchParams();
    searchUrl.set("isFlat", "false");
    router.replace(`${pathname}?${searchUrl.toString()}`);
  }, [pathname, router]);

  const onViewDetails = (params: GridRenderCellParams) => () => {
    handleOpenModal(modalTypes.categories.details.name, params.row.id);
  };
  const onDelete = (params: GridRenderCellParams) => () => {
    handleOpenModal(modalTypes.categories.delete.name, params.row.id);
  };
  const onEdit = (params: GridRenderCellParams) => () => {
    handleOpenModal(modalTypes.categories.form.name, params.row.id);
  };

  const colDef: GridColDef<Category>[] = [
    { field: "name", headerName: "Nombre", sortable: false, flex: 1 },
    {
      field: "description",
      headerName: "Descipción",
      sortable: false,
      flex: 2,
    },
    {
      field: "id",
      headerName: "Acciones",
      renderCell: (params) => (
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
      data={categories}
      pagination={pagination}
      disableSelection
    />
  );
}
