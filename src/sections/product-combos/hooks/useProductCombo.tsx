"use client";
import { getProductCombo } from "@/lib/services/productCombos";
import { ProductComboDetails } from "@/lib/types/productCombo";
import { useEffect, useState } from "react";
interface Props {
    productComboId: string | null;
}
export default function useProductCombo({ productComboId }: Props) {
  const [error, setError] = useState<string | undefined>(undefined);
  const [loadingData, setLoadingData] = useState(false);
  const [productCombo, setProductCombo] = useState<
    ProductComboDetails | undefined
  >(undefined);

  const fetchProductCombo = async () => {
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
    } else throw new Error("productComboId undefined");
  };
  useEffect(() => {
    fetchProductCombo();
  }, []);
  return { productCombo, loadingData, error, fetchProductCombo };
}
