"use client";
import * as React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Checkbox,
  TablePagination,
  IconButton,
  Toolbar,
  Typography,
  Tooltip,
  Chip,
} from "@mui/material";
import { Add, Delete as DeleteIcon, Edit } from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
import useTable from "./hooks/useTable";


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
  columns: Column<T>[];
  rows: (T & { id: string })[];
  onRowEdit?: (row: T) => void;
  onRowDelete?: (row: T) => void;
  title?: string;
  filters?: React.ReactNode;
}

export default function GenericTable<T extends { id: string }>({
  columns,
  rows,
  onRowEdit,
  onRowDelete,
  title = "Table",
  filters,
}: Props<T>) {
  const {
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
  } = useTable<T>({ rows });

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(selected.length > 0 && {
              bgcolor: (theme) =>
                alpha(
                  theme.palette.primary.main,
                  theme.palette.action.activatedOpacity
                ),
            }),
          }}
        >
          {selected.length > 0 ? (
            <Typography
              sx={{ flex: "1 1 100%" }}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              {selected.length} seleccionados
            </Typography>
          ) : (
            <Typography
              sx={{ flex: "1 1 100%" }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              {title}
            </Typography>
          )}
          {selected.length > 0 ? (
            <Tooltip title="Delete">
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Box sx={{ display: "flex", gap: 2 }}>
              {filters}
              <Tooltip title="Añadir">
                <IconButton color="primary">
                  <Add />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Toolbar>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={
                      selected.length > 0 && selected.length < rows.length
                    }
                    checked={rows.length > 0 && selected.length === rows.length}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={String(column.id)}
                    align={column.numeric ? "right" : "left"}
                    padding={column.disablePadding ? "none" : "normal"}
                    sortDirection={orderBy === column.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : "asc"}
                      onClick={() => handleRequestSort(column.id)}
                    >
                      {column.label}
                      {orderBy === column.id ? (
                        <Box component="span">
                          {order === "desc"
                            ? "sorted descending"
                            : "sorted ascending"}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((row) => {
                const isItemSelected = isSelected(row.id);

                return (
                  <TableRow
                    hover
                    onClick={() => handleClick(row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox color="primary" checked={isItemSelected} />
                    </TableCell>
                    {columns.map((column) => (
                      <TableCell
                        key={String(column.id)}
                        align={
                          !column.bool
                            ? column.numeric
                              ? "right"
                              : "left"
                            : "left"
                        }
                      >
                        {column.bool ? (
                          <Chip
                            label={
                              row[column.id]
                                ? column.bool.true
                                : column.bool.false
                            }
                            color={row[column.id] ? "success" : "error"}
                          />
                        ) : (
                          (row[column.id] as any)
                        )}
                      </TableCell>
                    ))}
                    <TableCell align="center">
                      {onRowEdit && (
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => onRowEdit(row)}
                        >
                          <Edit />
                        </IconButton>
                      )}
                      {onRowDelete && (
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => onRowDelete(row)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
