import z from "zod";

export const createCategorySchema = () =>
  z.object({
    name: z
      .string({ required_error: "El nombre es requerido" })
      .min(1, { message: "El nombre es requerido" }),
    description: z.string().optional(),
    parent: z
      .object({
        id: z.number(),
        name: z.string(),
      })
      .nullable(),
  });

export const createSubCategorySchema = () =>
  z.object({
    name: z.string().min(1, { message: "El nombre es requerido" }),
    description: z.string().optional(),
  });
