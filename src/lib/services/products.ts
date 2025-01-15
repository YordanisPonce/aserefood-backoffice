"use server";
import { revalidateTag } from "next/cache";
import { IQueryable } from "../types/filters";
import { Paginated, SearchParams } from "../types/pagination";
import { CreateProductDTO, Product, ProductDetails } from "../types/products";
import { fetchWithAuth } from "../utils/fetcher";
import { buildQueryParams, QueryParamsURLFactory } from "../utils/request";
import { createFormDataBody } from "../utils/request-body";
import { fileToBase64, getFile } from "./s3";
import { ApiErrors } from "../types/errors";

const productsTag = "products";

export const getProducts = async (
  params: SearchParams
): Promise<Paginated<Product>> => {
  const query: IQueryable = buildQueryParams(params);
  const queryObject = new QueryParamsURLFactory(
    query,
    `${process.env.NEXT_PUBLIC_API_URL}products`
  );
  const url = queryObject.build();
  const response = await fetchWithAuth(url, {
    next: {
      tags: [productsTag],
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
    new URL(`${process.env.NEXT_PUBLIC_API_URL}products/all`)
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
    `${process.env.NEXT_PUBLIC_API_URL}products/${productId}`,
    {
      cache: "no-store",
    }
  );
  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching products");
  }
  const product: ProductDetails = await response.json();
  if (product.image)
    product.image = await fileToBase64(
      await getFile(product.image, product.name)
    );

  return product;
};

export const createProduct = async (
  product: CreateProductDTO
): Promise<Paginated<Product>> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}products`,
    {
      method: "POST",
      body: await createFormDataBody(product),
    }
  );

  if (!response.ok) {
    console.log(response);
    if (response.status === 409)
      throw new Error("Ya existe un producto con el mismo nombre");
    else if (response.status === 400) {
      const error: {
        message: string;
        error: string;
        statusCode: number;
      } = await response.json();
      throw new Error(error.message);
    } else if (response.status === 401)
      throw new Error(ApiErrors.UNAUTHORIZEDERROR);
    else throw new Error("Error creating product");
  }
  console.log("Entre despues del redirect");
  return await response.json();
};

export const updateProduct = async (
  productId: string,
  product: CreateProductDTO
): Promise<void> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}products/` + productId,
    {
      method: "PATCH",
      body: await createFormDataBody(product),
    }
  );

  if (!response.ok) {
    console.log(response);
    if (response.status === 409)
      throw new Error("Ya existe un producto con el mismo nombre");
    else if (response.status === 400) {
      const error: {
        message: string;
        error: string;
        statusCode: number;
      } = await response.json();
      throw new Error(error.message);
    } else throw new Error("Error updating product");
  }
};

export const deleteProduct = async (productId: string): Promise<void> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}products/` + productId,
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
    } else throw new Error("Error deleting product");
  }
  revalidateTag(productsTag);
};
