import { ApiError, UnauthorizedClientError } from "../types/errors";

export function errorClientHandling(response: ApiError) {
  if (response.status === 401) {
    throw new UnauthorizedClientError(response.message);
  }

  else if (response.status < 200 || response.status >= 300) {
    throw new Error(response.message);
  }

}