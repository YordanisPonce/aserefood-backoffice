import { ApiError, UnauthorizedClientError } from "../types/errors";
export function errorClientHandling(respose: ApiError) {
  if (respose.status === 401)
    throw new UnauthorizedClientError(respose.message);
  else if (respose.status !== 201) throw new Error(respose.message);
}
