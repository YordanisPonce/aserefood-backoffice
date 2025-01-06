"use client";
import { getAllZones } from "@/lib/services/zones";
import { Zone } from "@/lib/types/zone";
import { useCallback, useEffect, useState } from "react";

export default function useAllZones() {
  const [zones, setZones] = useState<Zone[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchZones = useCallback(async () => {
    setLoading(true);
    setError(undefined);
    try {
      setZones(await getAllZones());
    } catch (error) {
      console.log(error);
      if (error instanceof Error) setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchZones();
  }, [fetchZones]);

  return { zones, isLoading, error, fetchZones };
}
