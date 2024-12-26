import { SearchParams } from "@/lib/types/pagination";
import { Paper } from "@mui/material";
import React from "react";
import SectionHeader from "@/components/partials/SectionHeader/SectionHeader";
import Modal from "@/components/partials/Modal/Modal";
import { modalTypes } from "@/components/partials/Modal/types/modalTypes";
import { getOrders } from "@/lib/services/orders";
import { OrdersList } from "@/sections/orders/components/OrdersList";
import OrderDetailsContainer from "@/sections/orders/containers/OrderDetailsContainer";
import { OrderFormContainer } from "@/sections/orders/containers/OrderFormContainer";

type OrdersPageProps = {
  searchParams: SearchParams;
};
export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const { data, page, total, pageSize } = await getOrders(searchParams);

  return (
    <Paper sx={{ p: 2 }}>
      <SectionHeader titleSection="Órdenes de Compra" />
      <OrdersList pagination={{ page, total, pageSize }} orders={data} />

      <Modal
        formPath={[modalTypes.orders.form.name]}
        titleModal={modalTypes.orders.form.title}
      >
        <OrderFormContainer />
      </Modal>
      <Modal
        formPath={[modalTypes.orders.details.name]}
        titleModal={modalTypes.orders.details.title}
      >
        <OrderDetailsContainer />
      </Modal>
    </Paper>
  );
}

export const dynamic = "force-dynamic";
