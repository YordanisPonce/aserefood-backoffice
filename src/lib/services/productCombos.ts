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
import { fileToBase64, getFile } from "./s3";
import { ApiError, ErrorMessages } from "../types/errors";

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

  const productCombo: ProductComboDetails = await response.json();
  if (productCombo.image)
    productCombo.image = await fileToBase64(
      await getFile(productCombo.image, productCombo.name)
    );

  return productCombo;
};

export const createProductCombo = async (
  productCombo: CreateProductComboDTO
): Promise<ApiError> => {
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
      return {
        status: response.status,
        message: "Ya existe un combo con el mismo nombre",
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
    } else throw new Error("Error creating product combo");
  }

  return { status: 201, message: ErrorMessages.OK };
};

export const updateProductCombo = async (
  productComboId: string,
  productCombo: CreateProductComboDTO
): Promise<ApiError> => {
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
      return {
        status: response.status,
        message: "Ya existe un combo con el mismo nombre",
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
    } else throw new Error("Error updating product combo");
  }

  return { status: 201, message: ErrorMessages.OK };
};

export const deleteProductCombo = async (
  productComboId: string
): Promise<ApiError> => {
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
      return { status: response.status, message: error.message };
    } else if (response.status === 401) {
      return { status: response.status, message: ErrorMessages.UNAUTHORIZED };
    } else throw new Error("Error deleting product combo");
  }
  revalidateTag(productCombosTag);

  return { status: 201, message: ErrorMessages.OK };
};
