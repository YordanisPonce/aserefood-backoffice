"use server";
import { IQueryable } from "../types/filters";
import { Paginated, SearchParams } from "../types/pagination";
import { CreateProvinceDTO, Province } from "../types/province";
import { fetchWithAuth } from "../utils/fetcher";
import { buildQueryParams, QueryParamsURLFactory } from "../utils/request";

export const getProvinces = async (
  params: SearchParams
): Promise<Paginated<Province>> => {
  const query: IQueryable = buildQueryParams(params);
  const queryObject = new QueryParamsURLFactory(
    query,
    `${process.env.NEXT_APP_API_URL}provinces`
  );
  const url = queryObject.build();
  const response = await fetchWithAuth(url);

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching providers");
  }

  return await response.json();
};

export const createProvince = async (
  province: CreateProvinceDTO
): Promise<Paginated<Province>> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_APP_API_URL}provinces`,
    {
      method: "POST",
      body: JSON.stringify(province),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    console.log(response);
    throw new Error("Error creating province");
  }

  return await response.json();
};
