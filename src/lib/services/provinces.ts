"use server";
import { revalidateTag } from "next/cache";
import { IQueryable } from "../types/filters";
import { Paginated, SearchParams } from "../types/pagination";
import { CreateProvinceDTO, Province } from "../types/province";
import { fetchWithAuth } from "../utils/fetcher";
import { buildQueryParams, QueryParamsURLFactory } from "../utils/request";
import { ApiError, ErrorMessages } from "../types/errors";

const provincesTag = "provinces";

export const getProvinces = async (
  params: SearchParams
): Promise<Paginated<Province>> => {
  const query: IQueryable = buildQueryParams(params);
  const queryObject = new QueryParamsURLFactory(
    query,
    `${process.env.NEXT_PUBLIC_API_URL}provinces`
  );
  const url = queryObject.build();
  const response = await fetchWithAuth(url, {
    next: {
      tags: [provincesTag],
    },
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching providers");
  }

  return await response.json();
};

export const getProvince = async (provinceId: string): Promise<Province> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}provinces/${provinceId}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching province");
  }

  return await response.json();
};

export const getAllProvinces = async (): Promise<Province[]> => {
  const response = await fetchWithAuth(
    new URL(`${process.env.NEXT_PUBLIC_API_URL}provinces/all`)
  );

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching provinces");
  }

  return await response.json();
};

export const createProvince = async (
  province: CreateProvinceDTO
): Promise<ApiError> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}provinces`,
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
    if (response.status === 409)
      return {
        status: response.status,
        message: "Ya existe una provincia con el mismo nombre",
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

export const updateProvince = async (
  provinceId: string,
  province: CreateProvinceDTO
): Promise<ApiError> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}provinces/` + provinceId,
    {
      method: "PATCH",
      body: JSON.stringify(province),
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
        message: "Ya existe una provincia con el mismo nombre",
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

export const deleteProvince = async (provinceId: string): Promise<ApiError> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}provinces/` + provinceId,
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
  revalidateTag(provincesTag);

  return { status: 201, message: ErrorMessages.OK };
};
