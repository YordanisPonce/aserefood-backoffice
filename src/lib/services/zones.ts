"use server";

import { revalidateTag } from "next/cache";
import { IQueryable } from "../types/filters";
import { Paginated, SearchParams } from "../types/pagination";
import { CreateZoneDTO, Zone, ZoneDetails } from "../types/zone";
import { fetchWithAuth } from "../utils/fetcher";
import { buildQueryParams, QueryParamsURLFactory } from "../utils/request";
import { ApiError, ErrorMessages } from "../types/errors";

const zonesTag = "zones";

export const getZones = async (
  params: SearchParams
): Promise<Paginated<Zone>> => {
  const query: IQueryable = buildQueryParams(params);
  const queryObject = new QueryParamsURLFactory(
    query,
    `${process.env.NEXT_PUBLIC_API_URL}zones`
  );
  const url = queryObject.build();
  const response = await fetchWithAuth(url, {
    next: {
      tags: [zonesTag],
    },
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching providers");
  }

  return await response.json();
};

export const getAllZones = async (): Promise<Zone[]> => {
  const response = await fetchWithAuth(
    new URL(`${process.env.NEXT_PUBLIC_API_URL}zones/all`)
  );

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching zones");
  }

  return await response.json();
};

export const getZone = async (zoneId: string): Promise<ZoneDetails> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}zones/${zoneId}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching zone");
  }

  return await response.json();
};

export const createZone = async (zone: CreateZoneDTO): Promise<ApiError> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}zones`,
    {
      method: "POST",
      body: JSON.stringify(zone),
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
        message: "Ya existe una zona con el mismo nombre",
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

export const updateZone = async (
  zoneId: string,
  zone: CreateZoneDTO
): Promise<ApiError> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}zones/` + zoneId,
    {
      method: "PATCH",
      body: JSON.stringify(zone),
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
        message: "Ya existe una zona con el mismo nombre",
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

export const deleteZone = async (zoneId: string): Promise<ApiError> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}zones/` + zoneId,
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
  revalidateTag(zonesTag);
  return { status: 201, message: ErrorMessages.OK };
};
