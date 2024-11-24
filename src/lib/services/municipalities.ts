"use server"
import { IQueryable } from "../types/filters";
import { CreateMunicipalityDTO, Municipality } from "../types/municipality";
import { Paginated, SearchParams } from "../types/pagination";
import { fetchWithAuth } from "../utils/fetcher";
import { buildQueryParams, QueryParamsURLFactory } from "../utils/request";

export const getMunicipalities = async (
  params: SearchParams
): Promise<Paginated<Municipality>> => {
  const query: IQueryable = buildQueryParams(params);
  const queryObject = new QueryParamsURLFactory(
    query,
    `${process.env.NEXT_APP_API_URL}municipalities`
  );
  const url = queryObject.build();
  const response = await fetchWithAuth(url);

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching municipalities");
  }

  return await response.json();
};

export const createMunicipalitie = async (
  municipality: CreateMunicipalityDTO
): Promise<Paginated<Municipality>> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_APP_API_URL}municipalities`,
    {
      method: "POST",
      body: JSON.stringify(municipality),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    console.log(response);
    throw new Error("Error creating municipalitie");
  }

  return await response.json();
};
