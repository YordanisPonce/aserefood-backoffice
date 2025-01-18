"use server";
import { ApiError, ErrorMessages } from "../types/errors";
import { IQueryable } from "../types/filters";
import { Order, OrderDetails, UpdateOrderDTO } from "../types/order";
import { Paginated, SearchParams } from "../types/pagination";
import { fetchWithAuth } from "../utils/fetcher";
import { buildQueryParams, QueryParamsURLFactory } from "../utils/request";
import { redirect } from "next/navigation";
import { routes } from "../config/routes";

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
    if (response.status === 401) {
      redirect(routes.login.path);
    } else throw new Error("Error fetching orders");
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
    if (response.status === 401) {
      redirect(routes.login.path);
    } else throw new Error("Error fetching order");
  }

  return await response.json();
};

export const updateOrder = async (
  orderId: string,
  order: UpdateOrderDTO
): Promise<ApiError> => {
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
      return {
        status: response.status,
        message: "No se puede actualizar el estado de un pedido cancelado",
      };
    else if (response.status === 400) {
      const error: {
        message: string;
        error: string;
        statusCode: number;
      } = await response.json();
      return { status: response.status, message: error.message };
    } else if (response.status === 401) {
      return { status: response.status, message: ErrorMessages.UNAUTHORIZED };
    } else throw new Error("Error updating order");
  }

  return { status: 201, message: ErrorMessages.OK };
};
