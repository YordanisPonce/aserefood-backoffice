"use client";
import { getAllCategories } from "@/lib/services/categories";
import { Category } from "@/lib/types/category";
import { useCallback, useEffect, useState } from "react";

export default function useAllCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(undefined);
    try {
      setCategories(await getAllCategories());
    } catch (error) {
      console.log(error);
      if (error instanceof Error) setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { categories, isLoading, error, fetchCategories };
}
