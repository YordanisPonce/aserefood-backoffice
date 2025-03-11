"use server";
import { IQueryable } from "../types/filters";
import { SearchParams } from "../types/pagination";
import { MostDemandedItem, Sales } from "../types/reports";
import { fetchWithAuth } from "../utils/fetcher";
import { buildQueryParams, QueryParamsURLFactory } from "../utils/request";

const reportsTag = "reports";
const BASE_QUERY = "reports/";
const BASE_SALES_QUERY = `${BASE_QUERY}sales/`;

// /v1/reports/mostDemandedProductCombos
export const getmostDemandedProductCombos = async (
  params: SearchParams
): Promise<MostDemandedItem[]> => {
  const query: IQueryable = buildQueryParams(params);
  const queryObject = new QueryParamsURLFactory(
    query,
    `${process.env.NEXT_PUBLIC_API_URL}${BASE_QUERY}mostDemandedProductCombos`
  );
  const url = queryObject.build();
  const response = await fetchWithAuth(url, {
    next: {
      tags: [reportsTag],
    },
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching mostDemandedProductCombos");
  }

  return await response.json();
};
// /v1/reports/mostDemandedProducts
export const getmostDemandedProducts = async (
  params: SearchParams
): Promise<MostDemandedItem[]> => {
  const query: IQueryable = buildQueryParams(params);
  const queryObject = new QueryParamsURLFactory(
    query,
    `${process.env.NEXT_PUBLIC_API_URL}${BASE_QUERY}mostDemandedProducts`
  );
  const url = queryObject.build();
  const response = await fetchWithAuth(url, {
    next: {
      tags: [reportsTag],
    },
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching mostDemandedProducts");
  }

  return await response.json();
};

// /v1/reports/sales/day
export const getDaySales = async (): Promise<Sales> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${BASE_SALES_QUERY}day`;
  const response = await fetchWithAuth(url, {
    next: {
      tags: [reportsTag],
    },
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching day sales");
  }

  return await response.json();
};
// /v1/reports/sales/month
export const getMonthSales = async (): Promise<Sales> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${BASE_SALES_QUERY}month`;
  const response = await fetchWithAuth(url, {
    next: {
      tags: [reportsTag],
    },
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching month sales");
  }

  return await response.json();
};

// /v1/reports/sales/week
export const getWeekSales = async (): Promise<Sales> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${BASE_SALES_QUERY}week`;
  const response = await fetchWithAuth(url, {
    next: {
      tags: [reportsTag],
    },
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching week sales");
  }

  return await response.json();
};
// /v1/reports/sales/year
export const getYearSales = async (): Promise<Sales> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${BASE_SALES_QUERY}year`;
  const response = await fetchWithAuth(url, {
    next: {
      tags: [reportsTag],
    },
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching year sales");
  }

  return await response.json();
};
