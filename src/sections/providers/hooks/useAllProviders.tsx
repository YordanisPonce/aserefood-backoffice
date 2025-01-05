"use client";
import { getAllProviders } from "@/lib/services/providers";
import { Provider } from "@/lib/types/provider";
import { useCallback, useEffect, useState } from "react";

export default function useAllProviders() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchProviders = useCallback(async () => {
    setLoading(true);
    setError(undefined);
    try {
      setProviders(await getAllProviders());
    } catch (error) {
      console.log(error);
      if (error instanceof Error) setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProviders();
  }, [fetchProviders]);

  return { providers, isLoading, error, fetchProviders };
}
