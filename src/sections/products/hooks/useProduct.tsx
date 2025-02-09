"use client";
import { getProduct } from "@/lib/services/products";
import { ProductDetails } from "@/lib/types/products";
import { useCallback, useEffect, useState } from "react";
interface Props {
  productId: string | null;
}
export default function useProduct({ productId }: Props) {
  const [error, setError] = useState<string | undefined>(undefined);
  const [loadingData, setLoadingData] = useState(false);
  const [product, setProduct] = useState<ProductDetails | undefined>(undefined);

  const fetchProduct = useCallback(async () => {
    if (productId) {
      setLoadingData(true);
      try {
        setProduct(await getProduct(productId));
        setError(undefined);
      } catch (error) {
        console.log(error);
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoadingData(false);
      }
    }
  }, [productId]);
  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);
  return { product, loadingData, error, fetchProduct };
}
