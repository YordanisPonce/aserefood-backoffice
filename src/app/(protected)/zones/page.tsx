import SectionHeader from "@/components/partials/SectionHeader/SectionHeader";
import { getZones } from "@/lib/services/zones";
import { SearchParams } from "@/lib/types/pagination";
import { AddZoneContainer } from "@/sections/zones/containers/AddZoneContainer";
import { ZonesList } from "@/sections/zones/components/ZonesList";
import { Paper } from "@mui/material";
import React from "react";

type PageProps = {
  searchParams: SearchParams;
};
export default async function Page({ searchParams }: PageProps) {
  const { data, page, total, pageSize } = await getZones(searchParams);

  return (
    <Paper sx={{ p: 2 }}>
      <SectionHeader
        titleSection="Zonas"
        titleButton="Crear Zona"
        createAction="create-zone"
      />
      <ZonesList pagination={{ page, total, pageSize }} zones={data} />
      <AddZoneContainer currentModal={searchParams.currentModal} />
    </Paper>
  );
}
