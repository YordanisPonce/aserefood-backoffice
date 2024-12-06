"use client";
import { getDeliveryMethod } from "@/lib/services/deliveryMethods";
import { DeliveryMethodDetails } from "@/lib/types/deliveryMethod";
import { useEffect, useState } from "react";
interface Props {
  deliveryMethodId: string | null;
}
export default function useDeliveryMethod({ deliveryMethodId }: Props) {
  const [error, setError] = useState<string | undefined>(undefined);
  const [loadingData, setLoadingData] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethodDetails | undefined>(undefined);

  const fetchDeliveryMethod = async () => {
    if (deliveryMethodId) {
      setLoadingData(true);
      try {
        setDeliveryMethod(await getDeliveryMethod(deliveryMethodId));
        setError(undefined);
      } catch (error) {
        console.log(error);
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoadingData(false);
      }
    } else throw new Error("deliveryMethodId undefined");
  };
  useEffect(() => {
    fetchDeliveryMethod();
  }, []);
  return { deliveryMethod, loadingData, error, fetchDeliveryMethod };
}
