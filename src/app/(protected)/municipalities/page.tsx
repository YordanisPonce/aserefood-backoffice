import DeleteEntityContainer from "@/components/containers/DeleteEntityContainer";
import Modal from "@/components/partials/Modal/Modal";
import { modalTypes } from "@/components/partials/Modal/types/modalTypes";
import SectionHeader from "@/components/partials/SectionHeader/SectionHeader";
import { getMunicipalities } from "@/lib/services/municipalities";
import { SearchParams } from "@/lib/types/pagination";
import { MunicipalitiesList } from "@/sections/municipalities/components/MunicipalitiesList";
import { MunicipalityFormContainer } from "@/sections/municipalities/containers/MunicipalityFormContainer";
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
        createAction={modalTypes.municipalities.form.name}
      />
      <MunicipalitiesList
        pagination={{ page, total, pageSize }}
        municipalities={data}
      />
      <Modal
        formPath={[modalTypes.municipalities.form.name]}
        titleModal={modalTypes.municipalities.form.title}
      >
        <MunicipalityFormContainer />
      </Modal>
      <Modal
        formPath={[modalTypes.municipalities.delete.name]}
        titleModal={modalTypes.municipalities.delete.title}
      >
        <DeleteEntityContainer
          message={modalTypes.municipalities.delete.message}
          title={modalTypes.municipalities.delete.subTitle}
        />
      </Modal>
    </Paper>
  );
}

export const dynamic = "force-dynamic";
