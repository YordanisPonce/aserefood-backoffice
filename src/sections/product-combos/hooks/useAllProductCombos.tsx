"use client";
import { getAllProductCombos } from "@/lib/services/productCombos";
import { ProductCombo } from "@/lib/types/productCombo";
import { useCallback, useEffect, useState } from "react";

export default function useAllProductCombos() {
  const [productCombos, setProductCombos] = useState<ProductCombo[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchProductCombos = useCallback(async () => {
    setLoading(true);
    setError(undefined);
    try {
      setProductCombos(await getAllProductCombos());
    } catch (error) {
      console.log(error);
      if (error instanceof Error) setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProductCombos();
  }, [fetchProductCombos]);

  return { productCombos, isLoading, error, fetchProductCombos };
}
