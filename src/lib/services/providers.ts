"use server";

import { IQueryable } from "../types/filters";
import { Paginated, SearchParams } from "../types/pagination";
import { CreateProviderDTO, Provider } from "../types/provider";
import { fetchWithAuth } from "../utils/fetcher";
import { buildQueryParams, QueryParamsURLFactory } from "../utils/request";

export const getProviders = async (
  params: SearchParams
): Promise<Paginated<Provider>> => {
  const query: IQueryable = buildQueryParams(params);
  const queryObject = new QueryParamsURLFactory(
    query,
    `${process.env.NEXT_APP_API_URL}providers`
  );
  const url = queryObject.build();
  const response = await fetchWithAuth(url);

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching providers");
  }

  return await response.json();
};

export const getAllProviders = async (): Promise<Provider[]> => {
  const response = await fetchWithAuth(
    new URL(`${process.env.NEXT_APP_API_URL}providers/all`)
  );

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching providers");
  }

  return await response.json();
};

export const getProvider = async (providerId: string): Promise<Provider> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_APP_API_URL}providers/${providerId}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching provider");
  }

  return await response.json();
};

export const createProvider = async (
  provider: CreateProviderDTO
): Promise<Paginated<Provider>> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_APP_API_URL}providers`,
    {
      method: "POST",
      body: JSON.stringify(provider),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    console.log(response);
    if (response.status === 409)
      throw new Error("Ya existe un proveedor con el mismo nombre");
    else if (response.status === 400) {
      const error: {
        message: string;
        error: string;
        statusCode: number;
      } = await response.json();
      throw new Error(error.message);
    } else throw new Error("Error creating provider");
  }

  return await response.json();
};

export const updateProvider = async (
  providerId: string,
  provider: CreateProviderDTO
): Promise<void> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_APP_API_URL}providers/` + providerId,
    {
      method: "PATCH",
      body: JSON.stringify(provider),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    console.log(response);
    if (response.status === 409)
      throw new Error("Ya existe un proveedor con el mismo nombre");
    else if (response.status === 400) {
      const error: {
        message: string;
        error: string;
        statusCode: number;
      } = await response.json();
      throw new Error(error.message);
    } else throw new Error("Error updating provider");
  }
};
