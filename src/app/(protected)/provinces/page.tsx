import DeleteEntityContainer from "@/components/containers/DeleteEntityContainer";
import Modal from "@/components/partials/Modal/Modal";
import { modalTypes } from "@/components/partials/Modal/types/modalTypes";
import SectionHeader from "@/components/partials/SectionHeader/SectionHeader";
import { getProvinces } from "@/lib/services/provinces";
import { SearchParams } from "@/lib/types/pagination";
import { ProvincesList } from "@/sections/provinces/components/ProvincesList";
import { ProvinceFormContainer } from "@/sections/provinces/containers/ProvinceFormContainer";

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
        createAction={modalTypes.provinces.form.name}
      />
      <ProvincesList pagination={{ page, total, pageSize }} providers={data} />
      <Modal
        formPath={[modalTypes.provinces.form.name]}
        titleModal={modalTypes.provinces.form.title}
      >
        <ProvinceFormContainer />
      </Modal>
      <Modal
        formPath={[modalTypes.provinces.delete.name]}
        titleModal={modalTypes.provinces.delete.title}
      >
        <DeleteEntityContainer
          message={modalTypes.provinces.delete.message}
          title={modalTypes.provinces.delete.subTitle}
        />
      </Modal>
    </Paper>
  );
}

export const dynamic = "force-dynamic";
