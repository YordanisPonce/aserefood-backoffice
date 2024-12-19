"use client";
import { getAllMunicipalities } from "@/lib/services/municipalities";
import { Municipality } from "@/lib/types/municipality";
import { useCallback, useEffect, useState } from "react";

export default function useAllMunicipalities() {
  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchMunicipalities = useCallback(async () => {
    setLoading(true);
    setError(undefined);
    try {
      setMunicipalities(await getAllMunicipalities());
    } catch (error) {
      console.log(error);
      if (error instanceof Error) setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMunicipalities();
  }, [fetchMunicipalities]);

  return { municipalities, isLoading, error, fetchMunicipalities };
}
