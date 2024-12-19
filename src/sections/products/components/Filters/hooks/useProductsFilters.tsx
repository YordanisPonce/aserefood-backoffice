"use client";
import { ProductsFilters } from "@/lib/types/products";
import { debounce } from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

export default function useProductsFilters() {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [filters, setFilters] = useState<ProductsFilters>({
    providerId: undefined,
    isService: false,
  });

  const updateFiltersInUrl = useCallback(
    debounce((updatedFilters: ProductsFilters) => {
      const searchUrl = new URLSearchParams(searchParams);
      Object.entries(updatedFilters).forEach(([key, value]) => {
        if (value) {
          if (typeof value === "number") searchUrl.set(key, value.toString());
          else if (typeof value === "boolean")
            searchUrl.set(key, value ? "true" : "false");
        }
      });
      replace(`${pathname}?${searchUrl.toString()}`);
    }, 300),
    [searchParams, pathname, replace]
  );

  function handleChangeFilters(updatedFilters: ProductsFilters) {
    setFilters((prev) => ({
      ...prev,
      ...updatedFilters,
    }));

    updateFiltersInUrl(updatedFilters);
  }

  function handleReset() {
    setFilters({
      providerId: undefined,
      isService: false,
    });
  }

  return { filters, handleChangeFilters, handleReset };
}
