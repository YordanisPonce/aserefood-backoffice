"use client";
import { getAllDeliveryMethods } from "@/lib/services/deliveryMethods";
import { DeliveryMethod } from "@/lib/types/deliveryMethod";
import { useCallback, useEffect, useState } from "react";

export default function useAllDeliveryMethods() {
  const [deliveryMethods, setDeliveryMethods] = useState<DeliveryMethod[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchDeliveryMethods = useCallback(async () => {
    setLoading(true);
    setError(undefined);
    try {
      setDeliveryMethods(await getAllDeliveryMethods());
    } catch (error) {
      console.log(error);
      if (error instanceof Error) setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDeliveryMethods();
  }, [fetchDeliveryMethods]);

  return { deliveryMethods, isLoading, error, fetchDeliveryMethods };
}
