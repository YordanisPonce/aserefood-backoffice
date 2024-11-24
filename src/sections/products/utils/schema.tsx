import z from "zod";

export const createProductSchema = () =>
  z.object({
    name: z.string({ required_error: "El nombre es requerido" }),
    shortDescription: z.string({
      required_error: "La descipción corta es requerida",
    }),
    description: z.string({ required_error: "La descipción es requerida" }),
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
