"use server";

import { IQueryable } from "../types/filters";
import { Paginated, SearchParams } from "../types/pagination";
import { CreateProductDTO, Product, ProductDetails } from "../types/products";
import { fetchWithAuth } from "../utils/fetcher";
import { buildQueryParams, QueryParamsURLFactory } from "../utils/request";

export const getProducts = async (
  params: SearchParams
): Promise<Paginated<Product>> => {
  const query: IQueryable = buildQueryParams(params);
  const queryObject = new QueryParamsURLFactory(
    query,
    `${process.env.NEXT_APP_API_URL}products`
  );
  const url = queryObject.build();
  const response = await fetchWithAuth(url, {
    next: {
      tags: ["products"],
    },
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching products");
  }

  return await response.json();
};

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await fetchWithAuth(
    new URL(`${process.env.NEXT_APP_API_URL}products/all`)
  );

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching products");
  }

  return await response.json();
};

export const getProduct = async (
  productId: string
): Promise<ProductDetails> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_APP_API_URL}products/${productId}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching products");
  }

  return await response.json();
};

export const createProducts = async (
  product: CreateProductDTO
): Promise<Paginated<Product>> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_APP_API_URL}products`,
    {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    console.log(response);
    throw new Error("Error creating product");
  }

  return await response.json();
};

export const updateProduct = async (
  productId: string,
  product: CreateProductDTO
): Promise<void> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_APP_API_URL}products/` + productId,
    {
      method: "PATCH",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    console.log(response);
    throw new Error("Error updating product");
  }
};
