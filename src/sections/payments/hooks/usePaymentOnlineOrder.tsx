"use client";
import {
  getPaymentOnlineOrder,
} from "@/lib/services/paymentsOnline";
import { PaymentOnline } from "@/lib/types/paymentOnline";
import { useCallback, useEffect, useState } from "react";
interface Props {
  orderId: string | null;
}
export default function usePaymentOnlineOrder({ orderId }: Props) {
  const [error, setError] = useState<string | undefined>(undefined);
  const [loadingData, setLoadingData] = useState(false);
  const [paymentOnline, setPaymentOnline] = useState<PaymentOnline | undefined>(
    undefined
  );

  const fetchPaymentOnlineOrder = useCallback(async () => {
    if (orderId) {
      setLoadingData(true);
      try {
        setPaymentOnline(await getPaymentOnlineOrder(orderId));
        setError(undefined);
      } catch (error) {
        console.log(error);
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoadingData(false);
      }
    }
  }, [orderId]);
  useEffect(() => {
    fetchPaymentOnlineOrder();
  }, [fetchPaymentOnlineOrder]);
  return { paymentOnline, loadingData, error, fetchPaymentOnlineOrder };
}
