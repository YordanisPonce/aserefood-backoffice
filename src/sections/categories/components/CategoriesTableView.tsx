"use client";

import { TableMenu } from "@/components/common/menu";
import RootDataGrid from "@/components/common/tabel/RootDataGrid";
import useModal from "@/components/partials/Modal/hooks/useModal";
import useUrlParams from "@/lib/hooks/useUrlParams";
import { Category } from "@/lib/types/category";
import { Pagination } from "@/lib/types/pagination";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

interface Props {
  categories: Category[];
  pagination: Pagination;
}

export default function CategoriesTableView({ categories, pagination }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { updateSearchParams } = useUrlParams();
  const { handleOpenModal } = useModal();

  useEffect(() => {
    const searchUrl = new URLSearchParams(searchParams);
    searchUrl.set("isFlat", "false");
    router.replace(`${pathname}?${searchUrl.toString()}`);
    return () => {
      router.replace(pathname);
    };
  }, []);

  const onViewDetails = (params: GridRenderCellParams) => () => {};
  const onDelete = (params: GridRenderCellParams) => () => {
    updateSearchParams({
      currentModal: {
        action: "set",
        value: "delete-entity",
      },
      id: {
        action: "set",
        value: params.row.id,
      },
    });
  };
  const onEdit = (params: GridRenderCellParams) => () => {
    handleOpenModal("form-category", params.row.id);
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
