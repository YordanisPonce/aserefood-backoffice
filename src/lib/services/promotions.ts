"use server";

import { revalidateTag } from "next/cache";
import { IQueryable } from "../types/filters";
import { Paginated, SearchParams } from "../types/pagination";
import {
  CreatePromotionDTO,
  Promotion,
  PromotionDetails,
} from "../types/promotion";
import { fetchWithAuth } from "../utils/fetcher";
import { buildQueryParams, QueryParamsURLFactory } from "../utils/request";
import { createFormDataBody } from "../utils/request-body";

const promotionsTag = "promotions";
const promotionsPath = "promotions";

export const getPromotions = async (
  params: SearchParams
): Promise<Paginated<Promotion>> => {
  const query: IQueryable = buildQueryParams(params);
  const queryObject = new QueryParamsURLFactory(
    query,
    `${process.env.NEXT_PUBLIC_API_URL}${promotionsPath}`
  );
  const url = queryObject.build();
  const response = await fetchWithAuth(url, {
    next: {
      tags: [promotionsTag],
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
    `${process.env.NEXT_PUBLIC_API_URL}${promotionsPath}/${promotionId}`,
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
    `${process.env.NEXT_PUBLIC_API_URL}${promotionsPath}`,
    {
      method: "POST",
      body: await createFormDataBody(promotion),
    }
  );

  if (!response.ok) {
    console.log(response);
    if (response.status === 400) {
      const error: {
        message: string;
        error: string;
        statusCode: number;
      } = await response.json();
      throw new Error(error.message);
    } else throw new Error("Error creating promotions");
  }

  return await response.json();
};

export const updatePromotion = async (
  promotionId: string,
  promotion: CreatePromotionDTO
): Promise<void> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}${promotionsPath}/` + promotionId,
    {
      method: "PATCH",
      body: await createFormDataBody(promotion),
    }
  );

  if (!response.ok) {
    console.log(response);
    if (response.status === 400) {
      const error: {
        message: string;
        error: string;
        statusCode: number;
      } = await response.json();
      throw new Error(error.message);
    } else throw new Error("Error updating promotions");
  }
};

export const deletePromotion = async (promotionId: string): Promise<void> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_APP_API_URL}${promotionsPath}/` + promotionId,
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
    } else throw new Error("Error deleting promotion");
  }
  revalidateTag(promotionsTag);
};
