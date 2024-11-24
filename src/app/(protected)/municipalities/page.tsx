import SectionHeader from "@/components/partials/SectionHeader/SectionHeader";
import { getMunicipalities } from "@/lib/services/municipalities";
import { SearchParams } from "@/lib/types/pagination";
import { MunicipalitiesList } from "@/sections/municipalities/components/MunicipalitiesList";
import { AddMunicipalitieContainer } from "@/sections/municipalities/containers/AddMunicipalitieContainer";
import { Paper } from "@mui/material";
import React from "react";

type PageProps = {
  searchParams: SearchParams;
};
export default async function Page({ searchParams }: PageProps) {
  const { data, page, total, pageSize } = await getMunicipalities(searchParams);

  return (
    <Paper sx={{ p: 2 }}>
      <SectionHeader
        titleSection="Municipios"
        titleButton="Crear Municipio"
        createAction="create-municipalitie"
      />
      <MunicipalitiesList
        pagination={{ page, total, pageSize }}
        municipalities={data}
      />
      <AddMunicipalitieContainer currentModal={searchParams.currentModal} />
    </Paper>
  );
}
