"use server";
import { PaymentOnline, PaymentOnlineErrors } from "../types/paymentOnline";
import { fetchWithAuth } from "../utils/fetcher";

const paymentsOnlinePath = "payments/online/";

export const getPaymentOnlineOrder = async (
  orderId: string
): Promise<PaymentOnline> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}${paymentsOnlinePath}order/` + orderId,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching payment");
  }

  return await response.json();
};

export const getPaymentOnline = async (
  paymentId: string
): Promise<PaymentOnline> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}${paymentsOnlinePath}` + paymentId,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    console.log(response);
    if (response.status === 404) {
      throw new Error(PaymentOnlineErrors.NOT_FOUND_PAYMENT_ORDER);
    } else throw new Error("Error fetching payment");
  }

  return await response.json();
};
