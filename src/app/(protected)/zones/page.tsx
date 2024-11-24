import { getZones } from "@/lib/services/zones";
import { SearchParams } from "@/lib/types/pagination";
import { ZonesList } from "@/sections/zones/ZonesList";
import { Box } from "@mui/material";
import React from "react";

type PageProps = {
  searchParams: SearchParams;
};
export default async function Page({ searchParams }: PageProps) {
  const { data, page, total, pageSize } = await getZones(searchParams);

  return (
    <Box sx={{ mt: 4, maxWidth: "100%" }}>
      <ZonesList pagination={{ page, total, pageSize }} zones={data} />
    </Box>
  );
}
