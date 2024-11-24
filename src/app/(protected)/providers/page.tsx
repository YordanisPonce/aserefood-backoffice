import SectionHeader from "@/components/partials/SectionHeader/SectionHeader";
import { getProviders } from "@/lib/services/providers";
import { SearchParams } from "@/lib/types/pagination";
import { ProviderList } from "@/sections/providers/components/ProvidersList";
import { AddProviderContainer } from "@/sections/providers/containers/AddProviderContainer";
import { Paper } from "@mui/material";
import React from "react";

type PageProps = {
  searchParams: SearchParams;
};
export default async function Page({ searchParams }: PageProps) {
  const { data, page, total, pageSize } = await getProviders(searchParams);

  return (
    <Paper sx={{ p: 2 }}>
      <SectionHeader
        titleSection="Proveedores"
        titleButton="Crear Proveedor"
        createAction="create-provider"
      />
      <ProviderList pagination={{ page, total, pageSize }} providers={data} />
      <AddProviderContainer currentModal={searchParams.currentModal} />
    </Paper>
  );
}
