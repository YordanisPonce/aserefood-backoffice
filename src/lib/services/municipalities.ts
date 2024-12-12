"use server";
import { revalidateTag } from "next/cache";
import { IQueryable } from "../types/filters";
import { CreateMunicipalityDTO, Municipality } from "../types/municipality";
import { Paginated, SearchParams } from "../types/pagination";
import { fetchWithAuth } from "../utils/fetcher";
import { buildQueryParams, QueryParamsURLFactory } from "../utils/request";

const municipalitiesTag = "municipalities";

export const getMunicipalities = async (
  params: SearchParams
): Promise<Paginated<Municipality>> => {
  const query: IQueryable = buildQueryParams(params);
  const queryObject = new QueryParamsURLFactory(
    query,
    `${process.env.NEXT_APP_API_URL}municipalities`
  );
  const url = queryObject.build();
  const response = await fetchWithAuth(url, {
    next: {
      tags: [municipalitiesTag],
    },
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching municipalities");
  }

  return await response.json();
};

export const getMunicipality = async (
  municipalityId: string
): Promise<Municipality> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_APP_API_URL}municipalities/${municipalityId}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching products");
  }

  return await response.json();
};

export const getAllMunicipalities = async (): Promise<Municipality[]> => {
  const response = await fetchWithAuth(
    new URL(`${process.env.NEXT_APP_API_URL}municipalities/all`)
  );

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching municipalities");
  }

  return await response.json();
};

export const getAvaliablesMunicipalities = async (): Promise<
  Municipality[]
> => {
  const response = await fetchWithAuth(
    new URL(`${process.env.NEXT_APP_API_URL}municipalities/available`)
  );

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching municipalities");
  }

  return await response.json();
};

export const createMunicipality = async (
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
    if (response.status === 409)
      throw new Error("Ya existe un municipio con el mismo nombre");
    else if (response.status === 400) {
      const error: {
        message: string;
        error: string;
        statusCode: number;
      } = await response.json();
      throw new Error(error.message);
    } else throw new Error("Error creating municipality");
  }

  return await response.json();
};

export const updateMunicipality = async (
  municipalityId: string,
  municipality: CreateMunicipalityDTO
): Promise<void> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_APP_API_URL}municipalities/` + municipalityId,
    {
      method: "PATCH",
      body: JSON.stringify(municipality),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    console.log(response);
    if (response.status === 409)
      throw new Error("Ya existe un municipio con el mismo nombre");
    else if (response.status === 400) {
      const error: {
        message: string;
        error: string;
        statusCode: number;
      } = await response.json();
      throw new Error(error.message);
    } else throw new Error("Error updating municipality");
  }
};

export const deleteMunicipality = async (
  municiplalityId: string
): Promise<void> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_APP_API_URL}municipalities/` + municiplalityId,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    console.log(response);
    if (response.status === 400 || response.status === 409) {
      const error: {
        message: string;
        error: string;
        statusCode: number;
      } = await response.json();
      throw new Error(error.message);
    } else throw new Error("Error deleting municipality");
  }
  revalidateTag(municipalitiesTag);
};
