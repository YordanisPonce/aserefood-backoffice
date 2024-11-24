
import { getProvinces } from "@/lib/services/provinces";
import { SearchParams } from "@/lib/types/pagination";
import { ProvincesList } from "@/sections/provinces/ProvincesList";
import React from "react";

type PageProps = {
  searchParams: SearchParams;
};
export default async function Page({ searchParams }: PageProps) {
  const { data, page, total, pageSize } = await getProvinces(searchParams);

  return (
    <ProvincesList pagination={{ page, total, pageSize }} providers={data} />
  );
}
