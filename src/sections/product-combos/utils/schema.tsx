import z from "zod";

export const createProductComboItemSchema = () =>
  z.object({
    product: z.object({
      id: z.number(),
      name: z.string(),
    }),
    amount: z.number().min(1, { message: "La cantidad es requerida" }),
  });

export const createProductComboSchema = () =>
  z.object({
    name: z.string().min(1, { message: "El nombre es requerido" }),
    shortDescription: z
      .string()
      .min(1, { message: "La descripción corta es requerida" }),
    description: z.string().min(1, { message: "La descripción es requerida" }),
    price: z.number().min(1, { message: "El precio es requerido" }),
    zone: z.object({
      id: z.number(),
      name: z.string(),
    }),
    isActive: z.boolean(),
    productComboItems: z
      .array(createProductComboItemSchema())
      .min(1, { message: "Debe agregar al menos un artículo" }),
  });
