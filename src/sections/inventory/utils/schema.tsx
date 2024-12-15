import z from "zod";

export const createInventoryEntrySchema = () =>
  z.object({
    price: z
      .number()
      .min(1, { message: "El precio tiene que ser un número positivo" }),
    quantity: z
      .number()
      .min(1, { message: "La cantidad tiene que ser un número positivo" }),
    product: z
      .object({
        id: z.number(),
        name: z.string(),
      })
      .nullable()
      .refine((obj) => obj !== null, {
        message: "Es necesario seleccionar un producto",
      }),
    zone: z
      .object({
        id: z.number(),
        name: z.string(),
      })
      .nullable()
      .refine((obj) => obj !== null, {
        message: "Es necesario seleccionar una zona",
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
