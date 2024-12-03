import { IQueryable } from "../types/filters";
import { SearchParams } from "../types/pagination";
import { toLowerCamelCase } from "./string-formatter";

export class QueryParamsURLFactory {
  private query: IQueryable;

  private baseUrl?: string;

  constructor(query: IQueryable, baseUrl?: string) {
    this.query = query;
    this.baseUrl = baseUrl;
  }

  build(): string {
    const queryParams = new URLSearchParams();
    const pagination = this.query?.pagination;
    const search = this.query?.search;
    const isFlat = this.query?.isFlat;

    // Add pagination
    if (pagination) {
      const { page, pageSize } = pagination;
      queryParams.set("page", page.toString());
      queryParams.set("pageSize", pageSize.toString());
    }

    // Add search
    if (search) {
      queryParams.set("search", search);
    }

    // Add ifFlat (only categories)
    if (isFlat !== undefined) {
      queryParams.set("isFlat", isFlat);
    }

    // Generate complete URL if baseUrl is provided
    if (this.baseUrl) {
      const url = new URL(this.baseUrl);
      url.search = queryParams.toString();
      return url.toString();
    }

    return Array.from(queryParams)
      .map(([key, value]) => {
        const camelCaseKey = toLowerCamelCase(key);
        return `${encodeURIComponent(camelCaseKey)}=${encodeURIComponent(
          value
        )}`;
      })
      .join("&");
  }
}

export const buildQueryParams = (params?: SearchParams): IQueryable => {
  const { page, pageSize, search, sort } = params || {
    page: 1,
    pageSize: 10,
    search: "",
  };

  const sortList = [];
  if (sort) {
    const [field, order] = sort.split(":");
    sortList.push({ field, isAsc: order === "asc" });
  }
  const query: IQueryable = {
    pagination: {
      page: page ? +page : 1,
      pageSize: pageSize ? +pageSize : 10,
    },
    search,
    sorts: sortList,
  };
  return query;
};
