"use client";
import { getProductCombo } from "@/lib/services/productCombos";
import { ProductComboDetails } from "@/lib/types/productCombo";
import { useCallback, useEffect, useState } from "react";
interface Props {
  productComboId: string | null;
}
export default function useProductCombo({ productComboId }: Props) {
  const [error, setError] = useState<string | undefined>(undefined);
  const [loadingData, setLoadingData] = useState(false);
  const [productCombo, setProductCombo] = useState<
    ProductComboDetails | undefined
  >(undefined);

  const fetchProductCombo = useCallback(async () => {
    if (productComboId) {
      setLoadingData(true);
      try {
        setProductCombo(await getProductCombo(productComboId));
        setError(undefined);
      } catch (error) {
        console.log(error);
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoadingData(false);
      }
    }
  }, [productComboId]);
  useEffect(() => {
    fetchProductCombo();
  }, [fetchProductCombo]);
  return { productCombo, loadingData, error, fetchProductCombo };
}
