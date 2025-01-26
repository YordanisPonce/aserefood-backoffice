"use client";

import { Box, Paper, Stack } from "@mui/material";
import {
  DataGrid,
  DataGridProps,
  GridColDef,
  GridPaginationModel,
  GridSortModel,
  GridValidRowModel,
} from "@mui/x-data-grid";
import { debounce } from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import EmptyContent from "../empty-content/empty-content";
import SearchItem from "../search/SearchItem";
import { Pagination } from "@/lib/types/pagination";

type Props = Omit<DataGridProps, "pagination" | "rows"> & {
  data: GridValidRowModel[];
  pagination: Pagination;
  columns: GridColDef[];
  hideFooter?: boolean;
  disableSelection?: boolean;
  rowHeight?: number;
  withoutSearch?: boolean;
  withoutBorder?: boolean;
  filters?: ReactNode;
};

const RootDataGrid: React.FC<Props> = ({
  data,
  pagination,
  columns,
  hideFooter,
  disableSelection,
  rowHeight,
  withoutSearch = false,
  withoutBorder = false,
  filters,
  ...other
}) => {
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [search, setSearch] = useState("");

  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const onPaginationModelChange = (model: GridPaginationModel) => {
    const searchUrl = new URLSearchParams(searchParams.toString());
    searchUrl.set("page", (model.page + 1).toString());
    searchUrl.set("pageSize", model.pageSize.toString());
    replace(`?${searchUrl.toString()}`, { scroll: false });
  };

  const onSortModelChange = (model: GridSortModel) => {
    setSortModel(model);
    const searchUrl = new URLSearchParams(searchParams);
    searchUrl.delete("sort");
    model.map((item) => searchUrl.append("sort", `${item.field},${item.sort}`));
    replace(`${pathname}?${searchUrl.toString()}`);
  };

  const onSearch = debounce((value: string) => {
    const searchUrl = new URLSearchParams(searchParams);
    searchUrl.set("search", value);
    replace(`${pathname}?${searchUrl.toString()}`);
  }, 500);

  const handleSearch = (value: string) => {
    setSearch(value);
    onSearch(value);
  };

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  const dataGridContent = (
    <Stack sx={{ gap: 3 }}>
      <Box display={"flex"} gap={1} alignItems={"center"}>
        {!withoutSearch && (
          <SearchItem
            sx={{
              height: "40px",
              fontSize: "14px",
              width: "100%",
            }}
            placeholder={"Buscar"}
            size="small"
            onSearch={handleSearch}
            value={search}
          />
        )}
        {filters && filters}
      </Box>
      <DataGrid
        {...other}
        rows={data}
        columns={columns}
        paginationMode="server"
        sortingMode="server"
        slots={{
          noRowsOverlay: () => (
            <Box
              width="100%"
              sx={{ verticalAlign: "center", minHeight: "250px" }}
            >
              <EmptyContent title={"No hay datos disponibles"} />
            </Box>
          ),
        }}
        rowCount={pagination.total}
        paginationModel={{
          page: pagination.page - 1,
          pageSize: pagination.pageSize,
        }}
        onPaginationModelChange={onPaginationModelChange}
        sortModel={sortModel}
        onSortModelChange={onSortModelChange}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        checkboxSelection={!disableSelection}
        disableRowSelectionOnClick
        disableColumnMenu={true}
        hideFooter={hideFooter}
        rowHeight={rowHeight}
        sx={{ minHeight: 450 }}
      />
    </Stack>
  );

  return !withoutBorder ? (
    <Paper elevation={2} sx={{ p: 4 }}>
      {dataGridContent}
    </Paper>
  ) : (
    dataGridContent
  );
};

export default RootDataGrid;
