"use client"
import { Pagination } from "@/lib/types/pagination";
import {
  Box,
  MenuItem,
  Select,
  Typography,
  Pagination as PaginationMUI,
} from "@mui/material";
import React from "react";
import useTreeItemsListPagination from "./hooks/useTreeItemsListPagination";

interface Props {
  pagination: Pagination;
  pageSizeOptions: number[]
}

export default function TreeItemsListPagination({ pagination, pageSizeOptions }: Props) {
  const {
    currentPage,
    pageSize,
    totalPages,
    handleChangePage,
    handlePageSizeChange,
  } = useTreeItemsListPagination({ pagination });
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography>Elementos por página:</Typography>
        <Select
          value={pageSize}
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
        page={currentPage}
        onChange={handleChangePage}
        color="primary"
      />
    </Box>
  );
}
