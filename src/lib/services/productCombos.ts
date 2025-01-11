"use server";

import { revalidateTag } from "next/cache";
import { IQueryable } from "../types/filters";
import { Paginated, SearchParams } from "../types/pagination";
import {
  CreateProductComboDTO,
  ProductCombo,
  ProductComboDetails,
} from "../types/productCombo";
import { fetchWithAuth } from "../utils/fetcher";
import { buildQueryParams, QueryParamsURLFactory } from "../utils/request";
import { createFormDataBody } from "../utils/request-body";

const productCombosTag = "product-combos";

export const getProductCombos = async (
  params: SearchParams
): Promise<Paginated<ProductCombo>> => {
  const query: IQueryable = buildQueryParams(params);
  const queryObject = new QueryParamsURLFactory(
    query,
    `${process.env.NEXT_PUBLIC_API_URL}product-combos`
  );
  const url = queryObject.build();
  const response = await fetchWithAuth(url, {
    next: {
      tags: [productCombosTag],
    },
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching product combos");
  }

  return await response.json();
};

export const getAllProductCombos = async (): Promise<ProductCombo[]> => {
  const response = await fetchWithAuth(
    new URL(`${process.env.NEXT_PUBLIC_API_URL}product-combos/all`)
  );

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching product combos");
  }

  return await response.json();
};

export const getProductCombo = async (
  productComboId: string
): Promise<ProductComboDetails> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}product-combos/${productComboId}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching product combo");
  }

  return await response.json();
};

export const createProductCombo = async (
  productCombo: CreateProductComboDTO
): Promise<Paginated<ProductCombo>> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}product-combos`,
    {
      method: "POST",
      body: await createFormDataBody(productCombo),
    }
  );

  if (!response.ok) {
    console.log(response);
    if (response.status === 409)
      throw new Error("Ya existe un combo con el mismo nombre");
    else if (response.status === 400) {
      const error: {
        message: string;
        error: string;
        statusCode: number;
      } = await response.json();
      throw new Error(error.message);
    } else throw new Error("Error creating product combo");
  }

  return await response.json();
};

export const updateProductCombo = async (
  productComboId: string,
  productCombo: CreateProductComboDTO
): Promise<void> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}product-combos/` + productComboId,
    {
      method: "PATCH",
      body: await createFormDataBody(productCombo),
    }
  );

  if (!response.ok) {
    console.log(response);
    if (response.status === 409)
      throw new Error("Ya existe un combo con el mismo nombre");
    else if (response.status === 400) {
      const error: {
        message: string;
        error: string;
        statusCode: number;
      } = await response.json();
      throw new Error(error.message);
    } else throw new Error("Error updating product combo");
  }
};

export const deleteProductCombo = async (
  productComboId: string
): Promise<void> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}product-combos/` + productComboId,
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
    } else throw new Error("Error deleting product combo");
  }
  revalidateTag(productCombosTag);
};
