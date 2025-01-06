"use client";
import { getAllProducts } from "@/lib/services/products";
import { Product } from "@/lib/types/products";
import { useCallback, useEffect, useState } from "react";

export default function useAllProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(undefined);
    try {
      setProducts(await getAllProducts());
    } catch (error) {
      console.log(error);
      if (error instanceof Error) setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, isLoading, error, fetchProducts };
}
