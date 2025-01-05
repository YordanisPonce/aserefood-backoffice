"use client";
import { ProductsFilters } from "@/lib/types/products";
import { debounce } from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

export default function useProductsFilters() {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [filters, setFilters] = useState<ProductsFilters>({
    providerId: undefined,
    isService: undefined,
  });

  const debouncedUpdateFiltersInUrl = useMemo(
    () =>
      debounce((updatedFilters: ProductsFilters) => {
        const searchUrl = new URLSearchParams(searchParams);
        Object.entries(updatedFilters).forEach(([key, value]) => {
          if (value !== undefined) {
            if (typeof value === "number") searchUrl.set(key, value.toString());
            else if (typeof value === "boolean")
              searchUrl.set(key, value ? "true" : "false");
          } else searchUrl.delete(key);
        });
        replace(`${pathname}?${searchUrl.toString()}`);
      }, 300),
    [searchParams, pathname, replace]
  );

  const updateFiltersInUrl = useCallback(
    (updatedFilters: ProductsFilters) => {
      debouncedUpdateFiltersInUrl(updatedFilters);
    },
    [debouncedUpdateFiltersInUrl]
  );

  async function handleChangeFilters(updatedFilters: ProductsFilters) {
    let newFilters: ProductsFilters = {};
    await setFilters((prev) => {
      newFilters = {
        ...prev,
        ...updatedFilters,
      };
      return newFilters;
    });
    console.log(newFilters);
    updateFiltersInUrl(newFilters);
  }

  function handleReset() {
    const filtersReset = {
      providerId: undefined,
      isService: undefined,
    };
    setFilters(filtersReset);

    updateFiltersInUrl(filtersReset);
  }

  return { filters, handleChangeFilters, handleReset };
}
