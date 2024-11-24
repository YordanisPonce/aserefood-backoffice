import { IQueryable } from "../types/filters";
import { Paginated, SearchParams } from "../types/pagination";
import { User } from "../types/users";
import { fetchWithAuth } from "../utils/fetcher";
import { buildQueryParams, QueryParamsURLFactory } from "../utils/request";

export const getProfile = async (username: string): Promise<unknown> => {
  try {
    const response = await fetchWithAuth(
      `${process.env.NEXT_APP_API_URL}/api/profiles/${username}`
    );

    if (!response.ok) {
      throw new Error("Error fetching profile");
    }

    return await response.json();
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getUsers = async (
  params: SearchParams
): Promise<Paginated<User>> => {
  const query: IQueryable = buildQueryParams(params);
  const queryObject = new QueryParamsURLFactory(
    query,
    `${process.env.NEXT_APP_API_URL}users`
  );
  const url = queryObject.build();
  const response = await fetchWithAuth(url);

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching users");
  }

  return await response.json();
};
