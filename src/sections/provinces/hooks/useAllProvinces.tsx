"use client";
import { getAllProvinces } from "@/lib/services/provinces";
import { Province } from "@/lib/types/province";
import { useCallback, useEffect, useState } from "react";

export default function useAllProvinces() {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchProvinces = useCallback(async () => {
    setLoading(true);
    setError(undefined);
    try {
      setProvinces(await getAllProvinces());
    } catch (error) {
      console.log(error);
      if (error instanceof Error) setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProvinces();
  }, [fetchProvinces]);

  return { provinces, isLoading, error, fetchProvinces };
}
