"use server";
import {
  PaymentTransfer,
  PaymentTransferErrors,
} from "../types/paymentTransfer";
import { fetchWithAuth } from "../utils/fetcher";
import { redirect } from "next/navigation";
import { routes } from "../config/routes";

const paymentsTransferPath = "payments/online/";

export const getPaymentTransferOrder = async (
  orderId: string
): Promise<PaymentTransfer> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}${paymentsTransferPath}order/` + orderId,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    console.log(response);
    if (response.status === 401) {
      redirect(routes.login.path);
    } else throw new Error("Error fetching payment");
  }

  return await response.json();
};

export const getPaymentTransfer = async (
  paymentId: string
): Promise<PaymentTransfer> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}${paymentsTransferPath}` + paymentId,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    console.log(response);
    if (response.status === 401) {
      redirect(routes.login.path);
    } else if (response.status === 404) {
      throw new Error(PaymentTransferErrors.NOT_FOUND_PAYMENT_ORDER);
    } else throw new Error("Error fetching payment");
  }

  return await response.json();
};
