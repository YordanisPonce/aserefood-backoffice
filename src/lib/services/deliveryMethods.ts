"use server";
import {
  CreateDeliveryMethodDTO,
  DeliveryMethod,
  DeliveryMethodDetails,
} from "../types/deliveryMethod";
import { IQueryable } from "../types/filters";
import { Paginated, SearchParams } from "../types/pagination";
import { fetchWithAuth } from "../utils/fetcher";
import { buildQueryParams, QueryParamsURLFactory } from "../utils/request";

export const getDeliveryMethods = async (
  params: SearchParams
): Promise<Paginated<DeliveryMethod>> => {
  const query: IQueryable = buildQueryParams(params);
  const queryObject = new QueryParamsURLFactory(
    query,
    `${process.env.NEXT_PUBLIC_API_URL}delivery-methods`
  );
  const url = queryObject.build();
  const response = await fetchWithAuth(url, {
    next: {
      tags: ["delivery-methods"],
    },
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching delivery methods");
  }

  return await response.json();
};

export const getDeliveryMethod = async (
  deliveryMethodId: string
): Promise<DeliveryMethodDetails> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}delivery-methods/${deliveryMethodId}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching delivery methods");
  }

  return await response.json();
};

export const createDeliveryMethod = async (
  deliveryMethod: CreateDeliveryMethodDTO
): Promise<Paginated<DeliveryMethod>> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}delivery-methods`,
    {
      method: "POST",
      body: JSON.stringify(deliveryMethod),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    console.log(response);
    throw new Error("Error creating delivery method");
  }

  return await response.json();
};

export const updateDeliveryMethod = async (
  deliveryMethodId: string,
  deliveryMethod: CreateDeliveryMethodDTO
): Promise<void> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}delivery-methods/` + deliveryMethodId,
    {
      method: "PATCH",
      body: JSON.stringify(deliveryMethod),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    console.log(response);
    throw new Error("Error updating delivery method");
  }
};
