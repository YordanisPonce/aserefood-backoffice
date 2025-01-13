"use server";
import { UpdateZelleConfDTO, ZelleConf } from "../types/zelleConf";
import { fetchWithAuth } from "../utils/fetcher";
import { createFormDataBody } from "../utils/request-body";
import { fileToBase64, getFile } from "./s3";

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
    if (response.status === 404) {
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
): Promise<void> => {
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
      throw new Error(error.message);
    } else throw new Error("Error updating zelle conf");
  }
};
