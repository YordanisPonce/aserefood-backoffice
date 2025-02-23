"use server";
import { ApiError, ErrorMessages } from "../types/errors";
import { UpdateZelleConfDTO, ZelleConf } from "../types/zelleConf";
import { fetchWithAuth } from "../utils/fetcher";
import { createFormDataBody } from "../utils/request-body";
import { fileToBase64, getFile } from "./s3";
import { redirect } from "next/navigation";
import { routes } from "../config/routes";

const zelleConfPath = "zelle-conf";
const zelleConfTag = "zelle-conf";

export const getZelleConf = async (): Promise<ZelleConf | undefined> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}${zelleConfPath}`,
    {
      next: {
        tags: [zelleConfTag],
      },
    }
  );

  if (!response.ok) {
    console.log(response);
    if (response.status === 401) {
      redirect(routes.login.path);
    } else if (response.status === 404) {
      return undefined;
    } else throw new Error("Error fetching zelle conf");
  }

  const zelleConf: ZelleConf = await response.json();
  if (zelleConf.qr)
    zelleConf.qr = await fileToBase64(
      await getFile(zelleConf.qr, zelleConf.phoneNumber)
    );

  return zelleConf;
};

export const updateZelleConf = async (
  zelleConf: UpdateZelleConfDTO
): Promise<ApiError> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}${zelleConfPath}`,
    {
      method: "PUT",
      body: await createFormDataBody(zelleConf),
    }
  );

  if (!response.ok) {
    console.log(response);

    if (response.status === 400) {
      const error: {
        message: string;
        error: string;
        statusCode: number;
      } = await response.json();
      return { status: response.status, message: error.message };
    } else if (response.status === 401) {
      return { status: response.status, message: ErrorMessages.UNAUTHORIZED };
    } else  return { status: response.status, message: ErrorMessages.UNEXPECTED };
  }

  return { status: 201, message: ErrorMessages.OK };
};
