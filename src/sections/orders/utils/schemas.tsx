import { OrderStatus, orderStatusMap } from "@/lib/types/order";
import z from "zod";

export const updateOrderSchema = () =>
  z.object({
    status: z.enum(
      [
        orderStatusMap.get(OrderStatus.PAYED) as string,
        orderStatusMap.get(OrderStatus.PAYMENT_PENDING) as string,
        orderStatusMap.get(OrderStatus.PROCESSING_PAYMENT) as string,
        orderStatusMap.get(OrderStatus.REFUNDED) as string,
        orderStatusMap.get(OrderStatus.DELIVERED) as string,
        orderStatusMap.get(OrderStatus.CANCELLED) as string,
      ],
      {
        errorMap: () => ({
          message: "Se debe de seleccionar un estado para la orden.",
        }),
      }
    ),
  });
