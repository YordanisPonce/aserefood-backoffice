"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../config/auth/authOptions";

export const fetchWithAuth = async (
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> => {
  const newInit = { ...init };
  newInit.headers = newInit.headers
    ? new Headers(newInit.headers)
    : new Headers();

  const session = await getServerSession(authOptions);

  if (session?.accessToken) {
    newInit.headers.append("Authorization", `Bearer ${session.accessToken}`);
  }

  return fetch(input, newInit);
};
