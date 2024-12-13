"use client";
import { getCategoryAncestors } from "@/lib/services/categories";
import { Category } from "@/lib/types/category";
import { useEffect, useState } from "react";
interface Props {
  categoryId: string | null;
}
export default function useCategoryAncestors({ categoryId }: Props) {
  const [error, setError] = useState<string | undefined>(undefined);
  const [loadingData, setLoadingData] = useState(false);
  const [ancestors, setAscestors] = useState<Category[]>([]);

  const fetchCategoryAncestors = async () => {
    if (categoryId) {
      setError(undefined);
      setLoadingData(true);
      try {
        setAscestors(await getCategoryAncestors(categoryId));
      } catch (error) {
        console.log(error);
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoadingData(false);
      }
    } else throw new Error("categoryId undefined");
  };
  useEffect(() => {
    fetchCategoryAncestors();
  }, []);
  return { ancestors, loadingData, error, fetchCategoryAncestors };
}
