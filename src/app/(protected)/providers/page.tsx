import DeleteEntityContainer from "@/components/containers/DeleteEntityContainer";
import Modal from "@/components/partials/Modal/Modal";
import { modalTypes } from "@/components/partials/Modal/types/modalTypes";
import SectionHeader from "@/components/partials/SectionHeader/SectionHeader";
import { getProviders } from "@/lib/services/providers";
import { SearchParams } from "@/lib/types/pagination";
import { ProviderList } from "@/sections/providers/components/ProvidersList";
import { ProviderFormContainer } from "@/sections/providers/containers/ProviderFormContainer";

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
        createAction={modalTypes.providers.form.name}
      />
      <ProviderList pagination={{ page, total, pageSize }} providers={data} />
      <Modal
        formPath={[modalTypes.providers.form.name]}
        titleModal={modalTypes.providers.form.title}
      >
        <ProviderFormContainer />
      </Modal>
      <Modal
        formPath={[modalTypes.providers.delete.name]}
        titleModal={modalTypes.providers.delete.title}
      >
        <DeleteEntityContainer
          message={modalTypes.providers.delete.message}
          title={modalTypes.providers.delete.subTitle}
        />
      </Modal>
    </Paper>
  );
}

export const dynamic = "force-dynamic";
