"use client";
import React from "react";
import { Alert, Box } from "@mui/material";
import CardListPagination from "./CardListPagination/CardListPagination";
import { Pagination } from "@/lib/types/pagination";
import Grid from "@mui/material/Grid2";
interface Props<T> {
  notInfoAvailableTitle: string;
  items: T[];
  CardComponent: React.ComponentType<{ data: T }>;
  maxHeight?: number | string;
  pagination?: {
    pagination: Pagination;
    clientHandleChangePage: (page: number) => void;
    clientHandlePageSizeChange: (pageSize: number) => void;
  };
}

export default function CardList<T>({
  notInfoAvailableTitle,
  items,
  CardComponent,
  maxHeight = "100%",
  pagination,
}: Props<T>) {
  return (
    <>
      <Box
        sx={{
          maxHeight: maxHeight,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ maxHeight: maxHeight, overflowY: "auto", padding: 2 }}>
          {items.length > 0 ? (
            <Grid container spacing={2}>
              {items.map((item: T, index) => (
                <Grid
                  size={{
                    xs: 12,
                    sm: 6,
                    md: 6,
                    lg: 6,
                  }}
                  key={index}
                >
                  <CardComponent data={item} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Alert severity="info">{notInfoAvailableTitle}</Alert>
          )}
        </Box>
        {pagination && (
          <CardListPagination
            pagination={pagination.pagination}
            clientHandleChangePage={pagination.clientHandleChangePage}
            clientHandlePageSizeChange={pagination.clientHandlePageSizeChange}
            pageSizeOptions={[5, 10, 20, 50, 100]}
          />
        )}
      </Box>
    </>
  );
}
