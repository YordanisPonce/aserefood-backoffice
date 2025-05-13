import { StatesDeliveryMethods } from "@/lib/types/deliveryMethod";
import z from "zod";

export const createDeliveryMethodSchema = () =>
  z
    .object({
      name: z
        .string({ required_error: "El nombre es requerido" })
        .min(1, { message: "El nombre es requerido" }),
      estimatedArrivalTime: z
        .string({ required_error: "El tiempo de arribo estimado es requerido" })
        .min(1, { message: "El tiempo de arribo estimado es requerido" }),
      isFree: z.string(),
      pickUpDirection: z
        .string({ required_error: "La dirección de envío es requerida" })
        .min(1, { message: "La dirección de envío es requerida" }),
      cost: z.number(),
      minimalDeliveryPrice: z.number(),
      municipality: z
        .object({
          id: z.number(),
          name: z.string(),
        })
        .nullable(),
    })
    .refine(
      (data) =>
        data.isFree === StatesDeliveryMethods.FREE
          ? data.cost === 0
          : data.cost > 0,
      {
        message:
          "Si el método es gratuito, el costo debe ser cero. De lo contrario, debe ser mayor que uno.",
        path: ["cost"],
      }
    )
    .refine((data) => data.pickUpDirection || data.municipality !== null, {
      message:
        "Si no hay dirección de envío, es necesario seleccionar un municipio.",
      path: ["municipality"],
    });
