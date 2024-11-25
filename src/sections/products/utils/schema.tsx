import z from "zod";

export const createProductSchema = () =>
  z.object({
    name: z.string().min(1, { message: "El nombre es requerido" }),
    shortDescription: z
      .string()
      .min(1, { message: "La descipción corta es requerida" }),
    description: z.string().min(1, { message: "La descipción es requerida" }),
    provider: z
      .object({
        id: z.number(),
        name: z.string(),
      })
      .nullable(),
    category: z
      .object({
        id: z.number(),
        name: z.string(),
      })
      .nullable(),
  });

export const updateProductSchema = () =>
  z.object({
    name: z.string().min(1, { message: "El nombre es requerido" }),
    shortDescription: z
      .string()
      .min(1, { message: "La descipción corta es requerida" }),
    description: z.string().min(1, { message: "La descipción es requerida" }),
    provider: z
      .object({
        id: z.number(),
        name: z.string(),
      })
      .nullable(),
    category: z
      .object({
        id: z.number(),
        name: z.string(),
      })
      .nullable(),
  });
