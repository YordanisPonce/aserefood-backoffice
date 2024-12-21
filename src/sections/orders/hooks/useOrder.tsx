"use client";
import { getOrder } from "@/lib/services/orders";
import { OrderDetails } from "@/lib/types/order";
import { useCallback, useEffect, useState } from "react";
interface Props {
  orderId: string | null;
}
export default function useOrder({ orderId }: Props) {
  const [error, setError] = useState<string | undefined>(undefined);
  const [loadingData, setLoadingData] = useState(false);
  const [order, setOrder] = useState<OrderDetails | undefined>(undefined);

  const fetchOrder = useCallback(async () => {
    if (orderId) {
      setLoadingData(true);
      try {
        setOrder(await getOrder(orderId));
        setError(undefined);
      } catch (error) {
        console.log(error);
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoadingData(false);
      }
    } else throw new Error("orderId undefined");
  }, [orderId]);
  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);
  return { order, loadingData, error, fetchOrder };
}
