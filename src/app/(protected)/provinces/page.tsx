import { getProvinces } from "@/lib/services/provinces";
import { SearchParams } from "@/lib/types/pagination";
import { ProvincesList } from "@/sections/provinces/ProvincesList";
import { Box } from "@mui/material";
import React from "react";

type PageProps = {
  searchParams: SearchParams;
};
export default async function Page({ searchParams }: PageProps) {
  const { data, page, total, pageSize } = await getProvinces(searchParams);

  return (
    <Box sx={{ mt: 4, maxWidth: "100%" }}>
      <ProvincesList pagination={{ page, total, pageSize }} providers={data} />
    </Box>
  );
}
