"use client";

import useModal from "@/components/partials/Modal/hooks/useModal";
import DeliveryMethodDetails from "../components/DeliveryMethodDetails";

export default function DeliveryMethodDetailsContainer() {
  const { entityId } = useModal();

  return <DeliveryMethodDetails deliveryMethodId={entityId} />;
}
