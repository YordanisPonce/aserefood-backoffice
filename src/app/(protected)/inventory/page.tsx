import { getInventoryEntries } from "@/lib/services/inventory";
import { SearchParams } from "@/lib/types/pagination";
import { InventoryList } from "@/sections/inventory/InventoryList";
import { Box } from "@mui/material";
import React from "react";

type PageProps = {
  searchParams: SearchParams;
};
export default async function Page({ searchParams }: PageProps) {
  const { data, page, total, pageSize } = await getInventoryEntries(
    searchParams
  );

  return (
    <Box sx={{ mt: 4, maxWidth: "100%" }}>
      <InventoryList
        pagination={{ page, total, pageSize }}
        inventoryEntries={data}
      />
    </Box>
  );
}
