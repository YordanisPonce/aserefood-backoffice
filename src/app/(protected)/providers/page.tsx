import SectionHeader from "@/components/partials/SectionHeader/SectionHeader";
import { getProviders } from "@/lib/services/providers";
import { SearchParams } from "@/lib/types/pagination";
import { ProviderList } from "@/sections/providers/ProvidersList";
import { Box, Paper } from "@mui/material";
import React from "react";

type PageProps = {
  searchParams: SearchParams;
};
export default async function Page({ searchParams }: PageProps) {
  const { data, page, total, pageSize } = await getProviders(searchParams);

  return (
    <ProviderList pagination={{ page, total, pageSize }} providers={data} />
  );
}
