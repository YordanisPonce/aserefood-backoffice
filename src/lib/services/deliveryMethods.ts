"use server";
import { revalidateTag } from "next/cache";
import {
  CreateDeliveryMethodDTO,
  DeliveryMethod,
  DeliveryMethodDetails,
} from "../types/deliveryMethod";
import { IQueryable } from "../types/filters";
import { Paginated, SearchParams } from "../types/pagination";
import { fetchWithAuth } from "../utils/fetcher";
import { buildQueryParams, QueryParamsURLFactory } from "../utils/request";

const deliveryMethodsPath = "delivery-methods";
const deliveryMethodsTag = "delivery-methods";

export const getDeliveryMethods = async (
  params: SearchParams
): Promise<Paginated<DeliveryMethod>> => {
  const query: IQueryable = buildQueryParams(params);
  const queryObject = new QueryParamsURLFactory(
    query,
    `${process.env.NEXT_PUBLIC_API_URL}${deliveryMethodsPath}`
  );
  const url = queryObject.build();
  const response = await fetchWithAuth(url, {
    next: {
      tags: [deliveryMethodsTag],
    },
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching delivery methods");
  }

  return await response.json();
};

export const getAllDeliveryMethods = async (): Promise<DeliveryMethod[]> => {
  const response = await fetchWithAuth(
    new URL(`${process.env.NEXT_PUBLIC_API_URL}delivery-methods/all`)
  );

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
    `${process.env.NEXT_PUBLIC_API_URL}${deliveryMethodsPath}/${deliveryMethodId}`,
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
    `${process.env.NEXT_PUBLIC_API_URL}${deliveryMethodsPath}`,
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
    if (response.status === 409)
      throw new Error("Ya existe un método de entrega con el mismo nombre");
    else if (response.status === 400) {
      const error: {
        message: string;
        error: string;
        statusCode: number;
      } = await response.json();
      throw new Error(error.message);
    } else throw new Error("Error creating delivery method");
  }

  return await response.json();
};

export const updateDeliveryMethod = async (
  deliveryMethodId: string,
  deliveryMethod: CreateDeliveryMethodDTO
): Promise<void> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}${deliveryMethodsPath}/` +
      deliveryMethodId,
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
    if (response.status === 409)
      throw new Error("Ya existe un método de entrega con el mismo nombre");
    else if (response.status === 400) {
      const error: {
        message: string;
        error: string;
        statusCode: number;
      } = await response.json();
      throw new Error(error.message);
    } else throw new Error("Error updating delivery method");
  }
};

export const deleteDeliveryMethod = async (
  deliveryMethodId: string
): Promise<void> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_APP_API_URL}${deliveryMethodsPath}/` + deliveryMethodId,
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
    } else throw new Error("Error deleting delivery method");
  }
  revalidateTag(deliveryMethodsTag);
};
