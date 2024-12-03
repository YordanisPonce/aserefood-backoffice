"use client";
import { Pagination } from "@/lib/types/pagination";
import { SelectChangeEvent } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Props {
  pagination: Pagination;
}

export default function useTreeItemsListPagination({ pagination }: Props) {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState(pagination.page);
  const [pageSize, setPageSize] = useState(pagination.pageSize);

  const [totalPages, setTotalPages] = useState(
    Math.round(pagination.total / pagination.pageSize)
  );

  useEffect(() => {
    setCurrentPage(pagination.page);
    setPageSize(pagination.pageSize);
    setTotalPages(Math.round(pagination.total / pagination.pageSize));
  }, [pagination]);

  function handleChangePage(event: React.ChangeEvent<unknown>, page: number) {
    const searchUrl = new URLSearchParams(searchParams.toString());
    searchUrl.set("page", page.toString());
    replace(`${pathname}?${searchUrl.toString()}`);
    setCurrentPage(page);
  }

  function handlePageSizeChange(event: SelectChangeEvent<number>) {
    const pageSize = event.target.value as number;
    const searchUrl = new URLSearchParams(searchParams.toString());
    searchUrl.set("pageSize", pageSize.toString());
    searchUrl.set("page", (1).toString());
    replace(`${pathname}?${searchUrl.toString()}`);
    setPageSize(pageSize);
    setCurrentPage(1);
  }
  return {
    currentPage,
    pageSize,
    handleChangePage,
    handlePageSizeChange,
    totalPages,
  };
}
