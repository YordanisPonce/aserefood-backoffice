"use client";
import React from "react";
import SelectInputFilterFetcher from "@/components/common/input/SelectInputFilterFetcher";
import RHFAutocompleteFetcher from "@/components/common/hook-form/RHFAutocompleteFetcher";
import useAllProvinces from "@/sections/provinces/hooks/useAllProvinces";
import useSelectMunicipalityInput from "./hooks/useSelectMunicipalityInput";
export default function SelectMunicipalityInput() {
  const {
    provinces,
    error: errorAllProvinces,
    isLoading: isLoadingAllProvinces,
    fetchProvinces,
  } = useAllProvinces();
  const { provinceId, fetchAvaliablesMunicipalities, setProvinceId } =
    useSelectMunicipalityInput();
  return (
    <>
      <SelectInputFilterFetcher
        value={provinceId}
        options={provinces}
        error={errorAllProvinces}
        isLoading={isLoadingAllProvinces}
        fetcher={fetchProvinces}
        label="Provincia (filtro para los municipios)"
        labelAbove={true}
        sx={{ height: 43 }}
        onChange={(e) =>
          setProvinceId(
            e.target.value === "" ? undefined : Number(e.target.value)
          )
        }
      />
      <RHFAutocompleteFetcher
        fullWidth
        name="municipalities"
        label="Municipios"
        multiple={true}
        onFetch={fetchAvaliablesMunicipalities}
        getOptionLabel={(opt) => opt.name}
        getOptionKey={(opt) => opt.id}
        size="small"
        disabled={provinceId === undefined}
      />
    </>
  );
}
