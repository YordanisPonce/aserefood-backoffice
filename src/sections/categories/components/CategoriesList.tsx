"use client";

import { Category } from "@/lib/types/category";
import { Pagination } from "@/lib/types/pagination";
import { Box, Tab, Tabs } from "@mui/material";

import { FunctionComponent, useState } from "react";
import CategoriesTreeView from "./CategoriesTreeView";
import CategoriesTableView from "./CategoriesTableView";

type CategoryListProps = {
  categories: Category[];
  pagination: Pagination;
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const CategoryList: FunctionComponent<CategoryListProps> = ({
  categories,
  pagination,
}) => {
  const [view, setView] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setView(newValue);
  };
  return (
    <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
      <Tabs
        value={view}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="Vista de Árbol" {...a11yProps(0)} />
        <Tab label="Vista de Tabla" {...a11yProps(1)} />
      </Tabs>
      {view === 0 ? (
        <CategoriesTreeView categories={categories} pagination={pagination} />
      ) : (
        <CategoriesTableView categories={categories} pagination={pagination} />
      )}
    </Box>
  );
};
