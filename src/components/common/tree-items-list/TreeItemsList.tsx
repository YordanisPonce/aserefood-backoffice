"use client";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton } from "@mui/material";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import {
  CategoryRounded as CategoryRoundedIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import EmptyContent from "../empty-content";
import useTreeItemsList from "./hooks/useTreeItemsList";
import { Pagination } from "@/lib/types/pagination";
import TreeItemsListPagination from "./components/tree-items-list-pagination/TreeItemsListPagination";

export interface DataTree {
  id: string;
  label: string;
  children: DataTree[];
}

interface Props {
  data: DataTree[];
  pagination: Pagination;
  onCreate?: (item: DataTree) => void;
  onEdit?: (item: DataTree) => void;
  onDelete?: (item: DataTree) => void;
  onViewDetails?: (item: DataTree) => void;
}

export default function TreeItemsList({
  data,
  pagination,
  onCreate,
  onDelete,
  onViewDetails,
  onEdit,
}: Props) {
  const { items } = useTreeItemsList({ data });

  function renderingTreeView(items: DataTree[]) {
    return items.map((item) => (
      <TreeItem
        key={item.id}
        itemId={item.id}
        label={
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 1,
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 3,
                alignItems: "center",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                }}
              >
                <CategoryRoundedIcon fontSize="inherit" />
                <span>{item.label}</span>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {onViewDetails && (
                <IconButton
                  size="small"
                  onClick={(event) => {
                    event.stopPropagation();
                    onViewDetails(item);
                  }}
                >
                  <VisibilityIcon fontSize="inherit" />
                </IconButton>
              )}
              {onCreate && (
                <IconButton
                  size="small"
                  onClick={(event) => {
                    event.stopPropagation();
                    onCreate(item);
                  }}
                >
                  <AddIcon fontSize="inherit" />
                </IconButton>
              )}
              {onEdit && (
                <IconButton
                  size="small"
                  onClick={(event) => {
                    event.stopPropagation();
                    onEdit(item);
                  }}
                >
                  <EditIcon fontSize="inherit" />
                </IconButton>
              )}
              {onDelete && (
                <IconButton
                  size="small"
                  onClick={(event) => {
                    event.stopPropagation();
                    onDelete(item);
                  }}
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              )}
            </Box>
          </Box>
        }
      >
        {renderingTreeView(item.children)}
      </TreeItem>
    ));
  }

  return (
    <Box
      sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 1 }}
    >
      {data.length > 0 ? (
        <Box>
          <SimpleTreeView>{renderingTreeView(items)}</SimpleTreeView>
          <TreeItemsListPagination
            pagination={pagination}
            pageSizeOptions={[5, 10, 20, 50, 100]}
          />
        </Box>
      ) : (
        <EmptyContent title={"No hay datos disponibles"} />
      )}
    </Box>
  );
}
