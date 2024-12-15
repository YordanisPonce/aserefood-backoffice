"use server";
import { IQueryable } from "../types/filters";
import { Paginated, SearchParams } from "../types/pagination";
import { CreateUserDTO, UpdateUserDTO, User } from "../types/users";
import { fetchWithAuth } from "../utils/fetcher";
import { buildQueryParams, QueryParamsURLFactory } from "../utils/request";

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

export const getUser = async (userId: string): Promise<User> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_APP_API_URL}users/${userId}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching user");
  }

  return await response.json();
};

export const createUser = async (
  user: CreateUserDTO
): Promise<Paginated<User>> => {
  const response = await fetchWithAuth(`${process.env.NEXT_APP_API_URL}users`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.log(response);
    if (response.status === 409)
      throw new Error(
        "Ya existe un usuario que comparte el mismo nombre de usuario o email"
      );
    else if (response.status === 400) {
      const error: {
        message: string;
        error: string;
        statusCode: number;
      } = await response.json();
      throw new Error(error.message);
    } else throw new Error("Error creating user");
  }

  return await response.json();
};

export const updateUser = async (
  userId: string,
  user: UpdateUserDTO
): Promise<void> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_APP_API_URL}users/` + userId,
    {
      method: "PATCH",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    console.log(response);
    if (response.status === 409)
      throw new Error(
        "Ya existe un usuario que comparte el mismo nombre de usuario o email"
      );
    else if (response.status === 400) {
      const error: {
        message: string;
        error: string;
        statusCode: number;
      } = await response.json();
      throw new Error(error.message);
    } else throw new Error("Error updating user");
  }
};
