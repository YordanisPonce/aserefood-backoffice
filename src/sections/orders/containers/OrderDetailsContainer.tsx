"use client";

import useModal from "@/components/partials/Modal/hooks/useModal";
import OrderDetails from "../components/OrderDetails/OrderDetails";

export default function OrderDetailsContainer() {
  const { entityId } = useModal();

  return <OrderDetails orderId={entityId} />;
}
