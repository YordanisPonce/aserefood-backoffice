import { IQueryable } from "../types/filters";
import { InventoryEntry } from "../types/inventory";
import { Paginated, SearchParams } from "../types/pagination";
import { fetchWithAuth } from "../utils/fetcher";
import { buildQueryParams, QueryParamsURLFactory } from "../utils/request";

export const getInventoryEntries = async (
  params: SearchParams
): Promise<Paginated<InventoryEntry>> => {
  const query: IQueryable = buildQueryParams(params);
  const queryObject = new QueryParamsURLFactory(
    query,
    `${process.env.NEXT_APP_API_URL}inventory-entries`
  );
  const url = queryObject.build();
  const response = await fetchWithAuth(url);

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching inventory entries");
  }

  return await response.json();
};
