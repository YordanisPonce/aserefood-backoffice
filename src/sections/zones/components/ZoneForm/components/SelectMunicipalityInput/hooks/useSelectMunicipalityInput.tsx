"use client";
import { getAvaliablesMunicipalities } from "@/lib/services/municipalities";
import { useCallback, useState } from "react";

export default function useSelectMunicipalityInput() {
  const [provinceId, setProvinceId] = useState<number | undefined>(undefined);
  const fetchAvaliablesMunicipalities = useCallback(async () => {
    return provinceId ? await getAvaliablesMunicipalities(provinceId) : [];
  }, [provinceId]);

  return {
    provinceId,
    setProvinceId,
    fetchAvaliablesMunicipalities,
  };
}
