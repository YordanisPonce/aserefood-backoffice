"use server";

import { getToken } from "./cookies";

export const fetchWithAuth = async (
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> => {
  const newInit = { ...init };
  newInit.headers = newInit.headers
    ? new Headers(newInit.headers)
    : new Headers();


  const token = getToken();
  if (token) {
    newInit.headers.append("Authorization", `Bearer ${getToken()}`);
  }

  return fetch(input, newInit);
};
