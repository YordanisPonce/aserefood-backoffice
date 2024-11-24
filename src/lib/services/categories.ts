"use server";

import { Category, CreateCategoryDTO } from "../types/category";
import { Paginated } from "../types/pagination";
import { SelectOption } from "../types/select";
import { fetchWithAuth } from "../utils/fetcher";

export const getAllCategories = async (): Promise<SelectOption[]> => {
  const response = await fetchWithAuth(
    new URL(`${process.env.NEXT_APP_API_URL}categories/all`)
  );

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching providers");
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
    throw new Error("Error creating category");
  }

  return await response.json();
};
