"use client";
import { getPaymentTransferOrder } from "@/lib/services/paymentsTransfer";
import { PaymentTransfer } from "@/lib/types/paymentTransfer";
import { useCallback, useEffect, useState } from "react";
interface Props {
  orderId: string | null;
}
export default function usePaymentTransferOrder({ orderId }: Props) {
  const [error, setError] = useState<string | undefined>(undefined);
  const [loadingData, setLoadingData] = useState(false);
  const [paymentTransfer, setPaymentTransfer] = useState<
    PaymentTransfer | undefined
  >(undefined);

  const fetchPaymentTransfer = useCallback(async () => {
    if (orderId) {
      setLoadingData(true);
      try {
        setPaymentTransfer(await getPaymentTransferOrder(orderId));
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
    fetchPaymentTransfer();
  }, [fetchPaymentTransfer]);
  return { paymentTransfer, loadingData, error, fetchPaymentTransfer };
}
