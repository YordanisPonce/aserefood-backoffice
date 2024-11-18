"use client"
import React from "react";

type Order = "asc" | "desc";

export interface Column<T> {
  id: keyof T;
  label: string;
  numeric?: boolean;
  disablePadding?: boolean;
  bool?: {
    // meaning
    true: string;
    false: string;
  };
}

interface Props<T> {
  rows: (T & { id: string })[];
}

export default function useTable<T extends { id: string }>({ rows }: Props<T>) {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof T | null>(null);
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (property: keyof T) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((row) => row.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = React.useMemo(() => {
    const sortedRows = orderBy
      ? [...rows].sort((a, b) => {
          if (a[orderBy] < b[orderBy]) {
            return order === "asc" ? -1 : 1;
          }
          if (a[orderBy] > b[orderBy]) {
            return order === "asc" ? 1 : -1;
          }
          return 0;
        })
      : rows;

    return sortedRows.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [order, orderBy, rows, page, rowsPerPage]);

  const isSelected = (id: string) => selected.includes(id);
  return {
    handleChangePage,
    handleChangeRowsPerPage,
    handleRequestSort,
    handleSelectAllClick,
    handleClick,
    visibleRows,
    isSelected,
    order,
    orderBy,
    selected,
    page,
    rowsPerPage,
  };
}
