"use server";

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
