"use client";
import DeliveryMethodDetails from "../components/DeliveryMethodDetails";
import { useContext } from "react";
import { ModalContext } from "@/components/partials/Modal/context/ModalContext";
import useDeliveryMethod from "../hooks/useDeliveryMethod";

export default function DeliveryMethodDetailsContainer() {
  const { entityId } = useContext(ModalContext);
    const deliveryMethodData = useDeliveryMethod({
      deliveryMethodId: entityId ?? "",
    });

  return <DeliveryMethodDetails deliveryMethodData={deliveryMethodData} />;
}
