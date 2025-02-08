"use client";
import DeliveryMethodDetails from "../components/DeliveryMethodDetails";
import { useContext } from "react";
import { ModalContext } from "@/components/partials/Modal/context/ModalContext";

export default function DeliveryMethodDetailsContainer() {
  const { entityId } = useContext(ModalContext);

  return <DeliveryMethodDetails deliveryMethodId={entityId} />;
}
