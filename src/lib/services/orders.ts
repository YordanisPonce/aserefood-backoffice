"use server";
import { IQueryable } from "../types/filters";
import { Order, OrderDetails, UpdateOrderDTO } from "../types/order";
import { Paginated, SearchParams } from "../types/pagination";
import { fetchWithAuth } from "../utils/fetcher";
import { buildQueryParams, QueryParamsURLFactory } from "../utils/request";

const ordersPath = "orders";
const ordersTag = "orders";

export const getOrders = async (
  params: SearchParams
): Promise<Paginated<Order>> => {
  const query: IQueryable = buildQueryParams(params);
  const queryObject = new QueryParamsURLFactory(
    query,
    `${process.env.NEXT_PUBLIC_API_URL}${ordersPath}`
  );
  const url = queryObject.build();
  const response = await fetchWithAuth(url, {
    next: {
      tags: [ordersTag],
    },
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching orders");
  }

  return await response.json();
};

export const getOrder = async (orderId: string): Promise<OrderDetails> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}${ordersPath}/${orderId}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    console.log(response);
    throw new Error("Error fetching order");
  }

  return await response.json();
};

export const updateOrder = async (
  orderId: string,
  order: UpdateOrderDTO
): Promise<void> => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}${ordersPath}/` + orderId,
    {
      method: "PATCH",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    console.log(response);
    if (response.status === 409)
      throw new Error(
        "No se puede actualizar el estado de un pedido cancelado"
      );
    else if (response.status === 400) {
      const error: {
        message: string;
        error: string;
        statusCode: number;
      } = await response.json();
      throw new Error(error.message);
    } else throw new Error("Error updating order");
  }
};
