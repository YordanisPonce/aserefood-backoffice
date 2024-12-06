import Modal from "@/components/partials/Modal/Modal";
import { modalTypes } from "@/components/partials/Modal/types/modalTypes";
import SectionHeader from "@/components/partials/SectionHeader/SectionHeader";
import { getDeliveryMethods } from "@/lib/services/deliveryMethods";
import { SearchParams } from "@/lib/types/pagination";
import { DeliveryMethodsList } from "@/sections/delivery-methods/components/DeliveryMethodsList";
import DeliveryMethodDetailsContainer from "@/sections/delivery-methods/containers/DeliveryMethodDetailsContainer";
import { DeliveryMethodFormContainer } from "@/sections/delivery-methods/containers/DeliveryMethodFormContainer";

import { Paper } from "@mui/material";
import React from "react";

type PageProps = {
  searchParams: SearchParams;
};
export default async function DeliveryMethodsPage({ searchParams }: PageProps) {
  const { data, page, total, pageSize } = await getDeliveryMethods(
    searchParams
  );

  return (
    <Paper sx={{ p: 2 }}>
      <SectionHeader
        titleSection="Métodos de Entrega"
        titleButton="Crear Método de Entrega"
        createAction={modalTypes.deliveryMethods.form.name}
      />
      <DeliveryMethodsList
        pagination={{ page, total, pageSize }}
        deliveryMethods={data}
      />
      <Modal
        formPath={modalTypes.deliveryMethods.form.name}
        titleModal={modalTypes.deliveryMethods.form.title}
      >
        <DeliveryMethodFormContainer />
      </Modal>
      <Modal
        formPath={modalTypes.deliveryMethods.details.name}
        titleModal={modalTypes.deliveryMethods.details.title}
      >
        <DeliveryMethodDetailsContainer />
      </Modal>
    </Paper>
  );
}
