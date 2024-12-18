"use client";
import { Pagination, SearchParams } from "@/lib/types/pagination";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  setSearchParams: Dispatch<SetStateAction<SearchParams>>;
}

export default function useClientPagination({ setSearchParams }: Props) {
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    pageSize: 10,
    total: 10,
  });

  function clientHandleChangePage(page: number) {
    setPagination((pagination) => ({
      ...pagination,
      page,
    }));
    setSearchParams((searchParams) => ({ ...searchParams, page }));
  }

  function clientHandlePageSizeChange(pageSize: number) {
    setPagination((pagination) => ({
      ...pagination,
      pageSize,
    }));
    setSearchParams((searchParams) => ({
      ...searchParams,
      pageSize,
      page: pageSize >= pagination.total ? 1 : pagination.page,
    }));
  }
  return {
    pagination,
    setPagination,
    clientHandleChangePage,
    clientHandlePageSizeChange,
  };
}
