"use client";
import OrderDetails from "../components/OrderDetails/OrderDetails";
import { useContext } from "react";
import { ModalContext } from "@/components/partials/Modal/context/ModalContext";

export default function OrderDetailsContainer() {
  const { entityId } = useContext(ModalContext);

  return <OrderDetails orderId={entityId} />;
}
