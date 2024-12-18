"use client";
import { Pagination } from "@/lib/types/pagination";
import {
  Box,
  MenuItem,
  Select,
  Typography,
  Pagination as PaginationMUI,
} from "@mui/material";
import React from "react";
import useCardListPagination from "./hooks/useCardListPagination";

interface Props {
  pagination: Pagination;
  clientHandleChangePage: (page: number) => void;
  clientHandlePageSizeChange: (page: number) => void;
  pageSizeOptions: number[];
}

export default function CardListPagination({
  pagination,
  pageSizeOptions,
  clientHandleChangePage,
  clientHandlePageSizeChange,
}: Props) {
  const { totalPages, handleChangePage, handlePageSizeChange } =
    useCardListPagination({
      pagination,
      clientHandleChangePage,
      clientHandlePageSizeChange,
    });
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 3,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography>Elementos por página:</Typography>
        <Select
          value={pagination.pageSize}
          onChange={handlePageSizeChange}
          size="small"
          sx={{ width: 80 }}
        >
          {pageSizeOptions.map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <PaginationMUI
        count={totalPages}
        page={pagination.page}
        onChange={handleChangePage}
        color="primary"
      />
    </Box>
  );
}
