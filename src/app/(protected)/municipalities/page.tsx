import { getMunicipalities } from "@/lib/services/municipalities";
import { SearchParams } from "@/lib/types/pagination";
import { MunicipalitiesList } from "@/sections/municipalities/MunicipalitiesList";
import React from "react";

type PageProps = {
  searchParams: SearchParams;
};
export default async function Page({ searchParams }: PageProps) {
  const { data, page, total, pageSize } = await getMunicipalities(searchParams);

  return (
    <MunicipalitiesList
      pagination={{ page, total, pageSize }}
      municipalities={data}
    />
  );
}
