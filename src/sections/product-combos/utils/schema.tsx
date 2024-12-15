import z from "zod";

export const createProductComboItemSchema = () =>
  z.object({
    product: z
      .object({
        id: z.number(),
        name: z.string(),
      })
      .nullable()
      .refine((obj) => obj !== null, {
        message: "Es necesario seleccionar un producto",
      }),
    amount: z.number().min(1, { message: "La cantidad es requerida" }),
  });

export const createProductComboSchema = () =>
  z.object({
    name: z
      .string({ required_error: "El nombre es requerido" })
      .min(1, { message: "El nombre es requerido" }),
    shortDescription: z
      .string({ required_error: "La descripción corta es requerida" })
      .min(1, { message: "La descripción corta es requerida" }),
    description: z
      .string({ required_error: "La descripción es requerida" })
      .min(1, { message: "La descripción es requerida" }),
    price: z
      .number()
      .min(1, { message: "El precio debe ser un número positivo" }),
    zone: z
      .object({
        id: z.number(),
        name: z.string(),
      })
      .nullable()
      .refine((obj) => obj !== null, {
        message: "Es necesario seleccionar una zona",
      }),
    isActive: z.boolean(),
    productComboItems: z
      .array(createProductComboItemSchema())
      .min(1, { message: "Debe agregar al menos un artículo" }),
  });
