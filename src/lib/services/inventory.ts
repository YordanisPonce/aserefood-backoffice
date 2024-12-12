"use server";

import { revalidateTag } from "next/cache";
import { IQueryable } from "../types/filters";
import {
  CreateInventoryEntryDTO,
  InventoryEntry,
  InventoryEntryDetails,
  UpdateInventoryEntryDTO,
} from "../types/inventory";
import { Paginated, SearchParams } from "../types/pagination";
import { fetchWithAuth } from "../utils/fetcher";
import { buildQueryParams, QueryParamsURLFactory } from "../utils/request";

const inventoryTag = "inventory-entries";

export const getInventoryEntries = async (
  params: SearchParams
): Promise<Paginated<InventoryEntry>> => {
  const query: IQueryable = buildQueryParams(params);
  const queryObject = new QueryParamsURLFactory(
    query,
    `${process.env.NEXT_APP_API_URL}inventory-entries`
  );
  const url = queryObject.build();
  const response = await fetchWithAuth(url, {
    next: {
      tags: [inventoryTag],
    },
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching inventory entries");
  }

  return await response.json();
};

export const getInventoryEntry = async (
  inventroyEntryId: string
): Promise<InventoryEntryDetails> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_APP_API_URL}inventory-entries/${inventroyEntryId}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching inventory entry");
  }

  return await response.json();
};

export const createInventoryEntry = async (
  inventoryEntries: CreateInventoryEntryDTO[]
): Promise<Paginated<InventoryEntry>> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_APP_API_URL}inventory-entries`,
    {
      method: "POST",
      body: JSON.stringify(inventoryEntries),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    console.log(response);
    if (response.status === 400) {
      const error: {
        message: string;
        error: string;
        statusCode: number;
      } = await response.json();
      throw new Error(error.message);
    } else throw new Error("Error creating inventory entries");
  }

  return await response.json();
};

export const updateInventoryEntry = async (
  inventoryEntryId: string,
  inventoryEntry: UpdateInventoryEntryDTO
): Promise<void> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_APP_API_URL}inventory-entries/` + inventoryEntryId,
    {
      method: "PATCH",
      body: JSON.stringify(inventoryEntry),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    console.log(response);
    if (response.status === 400) {
      const error: {
        message: string;
        error: string;
        statusCode: number;
      } = await response.json();
      throw new Error(error.message);
    } else throw new Error("Error updating inventory entry");
  }
};

export const deleteInventoryEntry = async (
  inventoryEntryId: string
): Promise<void> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_APP_API_URL}inventory-entries/` + inventoryEntryId,
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
    } else throw new Error("Error deleting inventory entry");
  }
  revalidateTag(inventoryTag);
};
