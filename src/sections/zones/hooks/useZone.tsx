"use client";
import { useCallback, useEffect, useState } from "react";
import { ZoneDetails } from "../containers/ZoneDetailsContainer";
import { getZone } from "@/lib/services/zones";
interface Props {
  zoneId: string | null;
}
export default function useZone({ zoneId }: Props) {
  const [error, setError] = useState<string | undefined>(undefined);
  const [loadingData, setLoadingData] = useState(false);
  const [zone, setZone] = useState<ZoneDetails | undefined>(undefined);

  const fetchZone = useCallback(async () => {
    if (zoneId) {
      setLoadingData(true);
      try {
        setZone(await getZone(zoneId));
        setError(undefined);
      } catch (error) {
        console.log(error);
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoadingData(false);
      }
    } else throw new Error("zoneId undefined");
  }, [zoneId]);
  useEffect(() => {
    fetchZone();
  }, [fetchZone]);
  return { zone, loadingData, error, fetchZone };
}
