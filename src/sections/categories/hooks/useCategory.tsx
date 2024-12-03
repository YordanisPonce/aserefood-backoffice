"use client";
import { getCategory } from "@/lib/services/categories";
import { CategoryDetails } from "@/lib/types/category";
import { useEffect, useState } from "react";
interface Props {
  categoryId: string | null;
}
export default function useCategory({ categoryId }: Props) {
  const [error, setError] = useState<string | undefined>(undefined);
  const [loadingData, setLoadingData] = useState(false);
  const [category, setCategory] = useState<CategoryDetails | undefined>(
    undefined
  );

  const fetchCategory = async () => {
    if (categoryId) {
      setError(undefined);
      setLoadingData(true);
      try {
        setCategory(await getCategory(categoryId));
      } catch (error) {
        console.log(error);
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoadingData(false);
      }
    } else throw new Error("categoryId undefined");
  };
  useEffect(() => {
    fetchCategory();
  }, []);
  return { category, loadingData, error, fetchCategory };
}
