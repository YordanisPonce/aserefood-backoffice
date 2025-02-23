"use server";

import { revalidateTag } from "next/cache";
import { IQueryable } from "../types/filters";
import { Paginated, SearchParams } from "../types/pagination";
import { CreateProviderDTO, Provider } from "../types/provider";
import { fetchWithAuth } from "../utils/fetcher";
import { buildQueryParams, QueryParamsURLFactory } from "../utils/request";
import { ApiError, ErrorMessages } from "../types/errors";

const providersTag = "providers";

export const getProviders = async (
  params: SearchParams
): Promise<Paginated<Provider>> => {
  const query: IQueryable = buildQueryParams(params);
  const queryObject = new QueryParamsURLFactory(
    query,
    `${process.env.NEXT_PUBLIC_API_URL}providers`
  );
  const url = queryObject.build();
  const response = await fetchWithAuth(url, {
    next: {
      tags: [providersTag],
    },
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching providers");
  }

  return await response.json();
};

export const getAllProviders = async (): Promise<Provider[]> => {
  const response = await fetchWithAuth(
    new URL(`${process.env.NEXT_PUBLIC_API_URL}providers/all`)
  );

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching providers");
  }

  return await response.json();
};

export const getProvider = async (providerId: string): Promise<Provider> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}providers/${providerId}`,
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
): Promise<ApiError> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}providers`,
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
      return {
        status: response.status,
        message: "Ya existe un proveedor con el mismo nombre",
      };
    else if (response.status === 400) {
      const error: {
        message: string;
        error: string;
        statusCode: number;
      } = await response.json();
      return { status: response.status, message: error.message };
    } else if (response.status === 401) {
      return { status: response.status, message: ErrorMessages.UNAUTHORIZED };
    } else  return { status: response.status, message: ErrorMessages.UNEXPECTED };
  }

  return { status: 201, message: ErrorMessages.OK };
};

export const updateProvider = async (
  providerId: string,
  provider: CreateProviderDTO
): Promise<ApiError> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}providers/` + providerId,
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
      return {
        status: response.status,
        message: "Ya existe un proveedor con el mismo nombre",
      };
    else if (response.status === 400) {
      const error: {
        message: string;
        error: string;
        statusCode: number;
      } = await response.json();
      return { status: response.status, message: error.message };
    } else if (response.status === 401) {
      return { status: response.status, message: ErrorMessages.UNAUTHORIZED };
    } else  return { status: response.status, message: ErrorMessages.UNEXPECTED };
  }

  return { status: 201, message: ErrorMessages.OK };
};

export const deleteProvider = async (providerId: string): Promise<ApiError> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}providers/` + providerId,
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
      return { status: response.status, message: error.message };
    } else if (response.status === 401) {
      return { status: response.status, message: ErrorMessages.UNAUTHORIZED };
    } else  return { status: response.status, message: ErrorMessages.UNEXPECTED };
  }
  revalidateTag(providersTag);

  return { status: 201, message: ErrorMessages.OK };
};
