import z from "zod";

export const createDeliveryMethodSchema = () =>
  z.object({
    name: z
      .string({ required_error: "El nombres es requerido" })
      .min(1, { message: "El nombres es requerido" }),
    estimatedArrivalTime: z
      .string({ required_error: "El tiempo de arrivo estimado es requerido" })
      .min(1, { message: "El tiempo de arrivo estimado es requerido" }),
    isFree: z.string(),
    pickUpDirection: z
      .string({ required_error: "La dirección de envío es requerida" })
      .min(1, { message: "La dirección de envío es requerida" }),
    cost: z.number().min(1, { message: "El cost debe de ser positivo" }),
    minimalDeliveryPrice: z.number().min(1, {
      message: "El Precio mínimo de entrega debe de ser positivo",
    }),
    municipality: z
      .object({
        id: z.number(),
        name: z.string(),
      })
      .nullable()
      .refine((obj) => obj !== null, {
        message: "Es necesario seleccionar un municipio",
      }),
  });
