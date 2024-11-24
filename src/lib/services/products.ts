import { IQueryable } from "../types/filters";
import { Paginated, SearchParams } from "../types/pagination";
import { Product } from "../types/products";
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
  const response = await fetchWithAuth(url);

  if (!response.ok) {
    throw new Error("Error fetching products");
  }
  console.log(response);

  return await response.json();
};
