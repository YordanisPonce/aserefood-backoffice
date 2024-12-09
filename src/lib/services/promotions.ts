"use server";

import { IQueryable } from "../types/filters";
import { Paginated, SearchParams } from "../types/pagination";
import { CreateProductDTO, Product, ProductDetails } from "../types/products";
import { CreatePromotionDTO, Promotion, PromotionDetails } from "../types/promotion";
import { fetchWithAuth } from "../utils/fetcher";
import { buildQueryParams, QueryParamsURLFactory } from "../utils/request";

export const getPromotions = async (
  params: SearchParams
): Promise<Paginated<Promotion>> => {
  const query: IQueryable = buildQueryParams(params);
  const queryObject = new QueryParamsURLFactory(
    query,
    `${process.env.NEXT_APP_API_URL}promotions`
  );
  const url = queryObject.build();
  const response = await fetchWithAuth(url, {
    next: {
      tags: ["promotions"],
    },
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching promotions");
  }

  return await response.json();
};

export const getPromotion = async (
  promotionId: string
): Promise<PromotionDetails> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_APP_API_URL}promotions/${promotionId}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching promotion");
  }

  return await response.json();
};

export const createPromotion = async (
  promotion: CreatePromotionDTO
): Promise<Paginated<Promotion>> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_APP_API_URL}promotions`,
    {
      method: "POST",
      body: JSON.stringify(promotion),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    console.log(response);
    throw new Error("Error creating promotions");
  }

  return await response.json();
};

export const updatePromotion = async (
  promotionId: string,
  promotion: CreatePromotionDTO
): Promise<void> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_APP_API_URL}promotions/` + promotionId,
    {
      method: "PATCH",
      body: JSON.stringify(promotion),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    console.log(response);
    throw new Error("Error updating promotions");
  }
};
