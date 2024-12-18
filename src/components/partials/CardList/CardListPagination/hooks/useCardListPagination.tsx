"use client";
import { Pagination } from "@/lib/types/pagination";
import { SelectChangeEvent } from "@mui/material";
import React, { useState } from "react";

interface Props {
  pagination: Pagination;
  clientHandleChangePage: (page: number) => void;
  clientHandlePageSizeChange: (page: number) => void;
}

export default function useCardListPagination({
  pagination,
  clientHandleChangePage,
  clientHandlePageSizeChange,
}: Props) {
  const [totalPages] = useState(
    Math.ceil(pagination.total / pagination.pageSize)
  );

  function handleChangePage(event: React.ChangeEvent<unknown>, page: number) {
    clientHandleChangePage(page);
  }

  function handlePageSizeChange(event: SelectChangeEvent<number>) {
    const pageSize = event.target.value as number;
    clientHandlePageSizeChange(pageSize);
  }
  return { totalPages, handleChangePage, handlePageSizeChange };
}
