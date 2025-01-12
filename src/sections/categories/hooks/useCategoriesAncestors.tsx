"use client";
import { getCategoryAncestors } from "@/lib/services/categories";
import { Category } from "@/lib/types/category";
import { useCallback, useEffect, useState } from "react";
interface Props {
  categories: Category[];
}
export default function useCategoriesAncestors({ categories }: Props) {
  const [error, setError] = useState<string | undefined>(undefined);
  const [loadingData, setLoadingData] = useState(false);
  const [ancestors, setAscestors] = useState<Category[]>([]);

  const fetchCategoriesAncestors = useCallback(async () => {
    setError(undefined);
    setLoadingData(true);
    try {
      const categoriesAncestors: Category[] = [];
      await Promise.all(
        categories.map(async (category) => {
          (await getCategoryAncestors(category.id.toString())).forEach(
            (categoryFetch) => {
              if (
                !categoriesAncestors.find(
                  (category) => category.id === categoryFetch.id
                )
              )
                categoriesAncestors.push(categoryFetch);
            }
          );
        })
      );
      setAscestors(categoriesAncestors);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) setError(error.message);
    } finally {
      setLoadingData(false);
    }
  }, [categories]);
  useEffect(() => {
    fetchCategoriesAncestors();
  }, [fetchCategoriesAncestors]);
  return { ancestors, loadingData, error, fetchCategoriesAncestors };
}
