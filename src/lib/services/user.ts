"use server";
import { revalidateTag } from "next/cache";
import { IQueryable } from "../types/filters";
import { Paginated, SearchParams } from "../types/pagination";
import { CreateUserDTO, UpdateUserDTO, User } from "../types/users";
import { fetchWithAuth } from "../utils/fetcher";
import { buildQueryParams, QueryParamsURLFactory } from "../utils/request";
import { createFormDataBody } from "../utils/request-body";
import { fileToBase64, getFile } from "./s3";
import { ApiError, ErrorMessages } from "../types/errors";
import { redirect } from "next/navigation";
import { routes } from "../config/routes";

const usersTag = "users";

export const getUsers = async (
  params: SearchParams
): Promise<Paginated<User>> => {
  const query: IQueryable = buildQueryParams(params);
  const queryObject = new QueryParamsURLFactory(
    query,
    `${process.env.NEXT_PUBLIC_API_URL}users`
  );
  const url = queryObject.build();
  const response = await fetchWithAuth(url, {
    next: {
      tags: [usersTag],
    },
  });

  if (!response.ok) {
    console.log(response);
    if (response.status === 401) {
      redirect(routes.login.path);
    } else throw new Error("Error fetching users");
  }

  return await response.json();
};

export const getAllUsers = async (): Promise<User[]> => {
  const response = await fetchWithAuth(
    new URL(`${process.env.NEXT_PUBLIC_API_URL}users/all`)
  );

  if (!response.ok) {
    console.log(response);
    if (response.status === 401) {
      redirect(routes.login.path);
    } else throw new Error("Error fetching users");
  }

  return await response.json();
};

export const getUser = async (userId: string): Promise<User> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}users/${userId}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    console.log(response);
    if (response.status === 401) {
      redirect(routes.login.path);
    } else throw new Error("Error fetching user");
  }

  const user: User = await response.json();
  if (user.image)
    user.image = await fileToBase64(await getFile(user.image, user.name));

  return user;
};

export const createUser = async (user: CreateUserDTO): Promise<ApiError> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}users`,
    {
      method: "POST",
      body: await createFormDataBody(user),
    }
  );

  if (!response.ok) {
    console.log(response);
    if (response.status === 409)
      return {
        status: response.status,
        message:
          "Ya existe un usuario que comparte el mismo nombre de usuario o email",
      };
    else if (response.status === 400) {
      const error: {
        message: string;
        error: string;
        statusCode: number;
      } = await response.json();
      return { status: response.status, message: error.message };
    } else if (response.status === 401) {
      return { status: response.status, message: ErrorMessages.UNAUTHORIZED };
    } else throw new Error("Error creating user");
  }

  return { status: 201, message: ErrorMessages.OK };
};

export const updateUser = async (
  userId: string,
  user: UpdateUserDTO
): Promise<ApiError> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}users/` + userId,
    {
      method: "PATCH",
      body: await createFormDataBody(user),
    }
  );

  if (!response.ok) {
    console.log(response);
    if (response.status === 409)
      return {
        status: response.status,
        message:
          "Ya existe un usuario que comparte el mismo nombre de usuario o email",
      };
    else if (response.status === 400) {
      const error: {
        message: string;
        error: string;
        statusCode: number;
      } = await response.json();
      return { status: response.status, message: error.message };
    } else if (response.status === 401) {
      return { status: response.status, message: ErrorMessages.UNAUTHORIZED };
    } else throw new Error("Error updating user");
  }

  return { status: 201, message: ErrorMessages.OK };
};

export const deleteUser = async (userId: string): Promise<ApiError> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}users/` + userId,
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
      return { status: response.status, message: error.message };
    } else if (response.status === 401) {
      return { status: response.status, message: ErrorMessages.UNAUTHORIZED };
    } else throw new Error("Error deleting user");
  }
  revalidateTag(usersTag);

  return { status: 201, message: ErrorMessages.OK };
};
