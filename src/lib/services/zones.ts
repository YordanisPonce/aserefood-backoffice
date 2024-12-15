"use server";
import { IQueryable } from "../types/filters";
import { Paginated, SearchParams } from "../types/pagination";
import { CreateZoneDTO, Zone, ZoneDetails } from "../types/zone";
import { fetchWithAuth } from "../utils/fetcher";
import { buildQueryParams, QueryParamsURLFactory } from "../utils/request";

export const getZones = async (
  params: SearchParams
): Promise<Paginated<Zone>> => {
  const query: IQueryable = buildQueryParams(params);
  const queryObject = new QueryParamsURLFactory(
    query,
    `${process.env.NEXT_APP_API_URL}zones`
  );
  const url = queryObject.build();
  const response = await fetchWithAuth(url);

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching providers");
  }

  return await response.json();
};

export const getAllZones = async (): Promise<Zone[]> => {
  const response = await fetchWithAuth(
    new URL(`${process.env.NEXT_APP_API_URL}zones/all`)
  );

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching zones");
  }

  return await response.json();
};

export const getZone = async (zoneId: string): Promise<ZoneDetails> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_APP_API_URL}zones/${zoneId}`,
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

export const createZone = async (
  zone: CreateZoneDTO
): Promise<Paginated<Zone>> => {
  const response = await fetchWithAuth(`${process.env.NEXT_APP_API_URL}zones`, {
    method: "POST",
    body: JSON.stringify(zone),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.log(response);
    if (response.status === 409)
      throw new Error("Ya existe una zona con el mismo nombre");
    else if (response.status === 400) {
      const error: {
        message: string;
        error: string;
        statusCode: number;
      } = await response.json();
      throw new Error(error.message);
    } else throw new Error("Error creating zone");
  }

  return await response.json();
};

export const updateZone = async (
  zoneId: string,
  zone: CreateZoneDTO
): Promise<void> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_APP_API_URL}zones/` + zoneId,
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
      throw new Error("Ya existe una zona con el mismo nombre");
    else if (response.status === 400) {
      const error: {
        message: string;
        error: string;
        statusCode: number;
      } = await response.json();
      throw new Error(error.message);
    } else throw new Error("Error updating zone");
  }
};
