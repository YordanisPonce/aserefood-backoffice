import SectionHeader from "@/components/partials/SectionHeader/SectionHeader";
import { getProvinces } from "@/lib/services/provinces";
import { SearchParams } from "@/lib/types/pagination";
import { ProvincesList } from "@/sections/provinces/components/ProvincesList";
import { AddProvinceContainer } from "@/sections/provinces/containers/AddProvinceContainer";
import { Paper } from "@mui/material";
import React from "react";

type PageProps = {
  searchParams: SearchParams;
};
export default async function Page({ searchParams }: PageProps) {
  const { data, page, total, pageSize } = await getProvinces(searchParams);

  return (
    <Paper sx={{ p: 2 }}>
      <SectionHeader
        titleSection="Provincias"
        titleButton="Crear Provincia"
        createAction="create-province"
      />
      <ProvincesList pagination={{ page, total, pageSize }} providers={data} />
      <AddProvinceContainer currentModal={searchParams.currentModal} />
    </Paper>
  );
}
