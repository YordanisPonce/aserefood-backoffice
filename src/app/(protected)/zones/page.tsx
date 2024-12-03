import SectionHeader from "@/components/partials/SectionHeader/SectionHeader";
import { getZones } from "@/lib/services/zones";
import { SearchParams } from "@/lib/types/pagination";
import { ZonesList } from "@/sections/zones/components/ZonesList";
import { Paper } from "@mui/material";
import React from "react";
import Modal from "@/components/partials/Modal/Modal";
import { modalTypes } from "@/components/partials/Modal/types/modalTypes";
import { ZoneFormContainer } from "@/sections/zones/containers/ZoneFormContainer";


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
        createAction={modalTypes.zones.form.name}
      />
      <ZonesList pagination={{ page, total, pageSize }} zones={data} />
      <Modal
        formPath={[modalTypes.zones.form.name]}
        titleModal={modalTypes.zones.form.title}
      >
        <ZoneFormContainer />
      </Modal>
    </Paper>
  );
}
