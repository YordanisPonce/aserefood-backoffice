import DeleteEntityContainer from "@/components/containers/DeleteEntityContainer";
import Modal from "@/components/partials/Modal/Modal";
import { modalTypes } from "@/components/partials/Modal/types/modalTypes";
import SectionHeader from "@/components/partials/SectionHeader/SectionHeader";
import { getInventoryEntries } from "@/lib/services/inventory";
import { SearchParams } from "@/lib/types/pagination";
import { InventoryList } from "@/sections/inventory/components/InventoryList";
import InventoryEntryDetailsContainer from "@/sections/inventory/containers/InventoryEntryDetailsContainer";
import { InventoryEntryFormContainer } from "@/sections/inventory/containers/InventoryEntryFormContainer";
import { Paper } from "@mui/material";
import React from "react";

type PageProps = {
  searchParams: SearchParams;
};
export default async function Page({ searchParams }: PageProps) {
  const { data, page, total, pageSize } = await getInventoryEntries(
    searchParams
  );

  return (
    <Paper sx={{ p: 2 }}>
      <SectionHeader
        titleSection="Entradas de Inventario"
        titleButton="Crear Entrada"
        createAction={modalTypes.inventory.form.name}
      />
      <InventoryList
        pagination={{ page, total, pageSize }}
        inventoryEntries={data}
      />
      <Modal
        formPath={[modalTypes.inventory.form.name]}
        titleModal={modalTypes.inventory.form.title}
      >
        <InventoryEntryFormContainer />
      </Modal>
      <Modal
        formPath={[modalTypes.inventory.details.name]}
        titleModal={modalTypes.inventory.details.title}
      >
        <InventoryEntryDetailsContainer />
      </Modal>
      <Modal
        formPath={[modalTypes.inventory.delete.name]}
        titleModal={modalTypes.inventory.delete.title}
      >
        <DeleteEntityContainer
          message={modalTypes.inventory.delete.message}
          title={modalTypes.inventory.delete.subTitle}
        />
      </Modal>
    </Paper>
  );
}

export const dynamic = "force-dynamic";
