import z from "zod";

export const createInventoryEntrySchema = () =>
  z.object({
    price: z
      .number()
      .min(1, { message: "El precio tiene que ser un número positivo" }),
    quantity: z
      .number()
      .min(1, { message: "La cantidad tiene que ser un número positivo" }),
    product: z.object({
      id: z.number(),
      name: z.string(),
    }),
    zone: z.object({
      id: z.number(),
      name: z.string(),
    }),
  });

export const updateInventoryEntrySchema = () =>
  z.object({
    price: z
      .number()
      .min(1, { message: "El precio tiene que ser un número positivo" }),
    quantity: z
      .number()
      .min(1, { message: "La cantidad tiene que ser un número positivo" }),
  });
