"use server";

import { getServerSession } from "next-auth";

export const fetchWithAuth = async (
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> => {
  const newInit = { ...init };
  newInit.headers = newInit.headers
    ? new Headers(newInit.headers)
    : new Headers();

  const session = await getServerSession();

  if (session?.accessToken) {
    newInit.headers.append("Authorization", `Bearer ${session.accessToken}`);
  }

  return fetch(input, newInit);
};
