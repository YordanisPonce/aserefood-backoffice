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
import SearchItem from "../search";
import useTreeItemsList from "./hooks/useTreeItemsList";
import { debounce } from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import EmptyContent from "../empty-content";
export interface DataTree {
  id: string;
  label: string;
  children: DataTree[];
}
interface Props {
  data: DataTree[];
  onCreate?: (item: DataTree) => void;
  onEdit?: (item: DataTree) => void;
  onDelete?: (item: DataTree) => void;
  onViewDetails?: (item: DataTree) => void;
}

export default function TreeItemsList({
  data,
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
              {/*item.children.length > 0 && (
                <SearchItem
                  size="small"
                  placeholder={"Buscar"}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "30px",
                    },
                    "& .MuiInputBase-input": {
                      padding: "4px 8px",
                      fontSize: "14px",
                    },
                  }}
                  onSearch={() => onSearch(item)}
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                />
              )*/}
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
      {items.length > 0 ? (
        <SimpleTreeView>{renderingTreeView(items)}</SimpleTreeView>
      ) : (
        <EmptyContent title={"No hay datos disponibles"} />
      )}
    </Box>
  );
}
