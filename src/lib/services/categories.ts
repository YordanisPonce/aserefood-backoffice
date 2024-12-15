"use server";

import {
  Category,
  CategoryDetails,
  CreateCategoryDTO,
} from "../types/category";
import { IQueryable } from "../types/filters";
import { Paginated, SearchParams } from "../types/pagination";
import { SelectOption } from "../types/select";
import { fetchWithAuth } from "../utils/fetcher";
import { buildQueryParams, QueryParamsURLFactory } from "../utils/request";

export const getCategories = async (
  params: SearchParams
): Promise<Paginated<Category>> => {
  const query: IQueryable = buildQueryParams(params);
  query.isFlat =
    params.isFlat === "true" || params.isFlat === "false"
      ? params.isFlat
      : undefined;
  const queryObject = new QueryParamsURLFactory(
    query,
    `${process.env.NEXT_APP_API_URL}categories`
  );
  const url = queryObject.build();
  const response = await fetchWithAuth(url, {
    next: {
      tags: ["categories"],
    },
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching categories");
  }
  const data = await response.json();

  return data;
};

export const getCategory = async (
  categoryId: string
): Promise<CategoryDetails> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_APP_API_URL}categories/${categoryId}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching category");
  }

  return await response.json();
};

export const getAllCategories = async (): Promise<SelectOption[]> => {
  const response = await fetchWithAuth(
    new URL(`${process.env.NEXT_APP_API_URL}categories/all`)
  );

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching categories");
  }

  return await response.json();
};

export const createCategory = async (
  category: CreateCategoryDTO
): Promise<Paginated<Category>> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_APP_API_URL}categories`,
    {
      method: "POST",
      body: JSON.stringify(category),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    console.log(response);
    if (response.status === 409)
      throw new Error("Ya existe una categoría con el mismo nombre");
    else if (response.status === 400) {
      const error: {
        message: string;
        error: string;
        statusCode: number;
      } = await response.json();
      throw new Error(error.message);
    } else throw new Error("Error creating category");
  }

  return await response.json();
};

export const updateCategory = async (
  categoryId: string,
  category: CreateCategoryDTO
): Promise<void> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_APP_API_URL}categories/` + categoryId,
    {
      method: "PATCH",
      body: JSON.stringify(category),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    console.log(response);
    if (response.status === 409)
      throw new Error("Ya existe una categoría con el mismo nombre");
    else if (response.status === 400) {
      const error: {
        message: string;
        error: string;
        statusCode: number;
      } = await response.json();
      throw new Error(error.message);
    } else throw new Error("Error updating category");
  }
};
