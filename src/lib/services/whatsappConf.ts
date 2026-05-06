"use server";
import { ApiError, ErrorMessages } from "../types/errors";
import { UpdateWhatsAppConfDTO, WhatsAppConf } from "../types/whatsappConf";
import { fetchWithAuth } from "../utils/fetcher";
import { redirect } from "next/navigation";
import { routes } from "../config/routes";

const whatsappConfPath = "whatsapp-conf";
const whatsappConfTag = "whatsapp-conf";

export const getWhatsAppConf = async (): Promise<WhatsAppConf | undefined> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}${whatsappConfPath}`,
    {
      next: {
        tags: [whatsappConfTag],
      },
    }
  );

  if (!response.ok) {
    console.log(response);
    if (response.status === 401) {
      redirect(routes.login.path);
    } else if (response.status === 404) {
      return undefined;
    } else throw new Error("Error fetching WhatsApp configuration");
  }

  const whatsappConf: WhatsAppConf = await response.json();
  return whatsappConf;
};

export const updateWhatsAppConf = async (
  whatsappConf: UpdateWhatsAppConfDTO
): Promise<ApiError> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}${whatsappConfPath}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(whatsappConf),
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
    } else return { status: response.status, message: ErrorMessages.UNEXPECTED };
  }

  return { status: 200, message: ErrorMessages.OK };
};