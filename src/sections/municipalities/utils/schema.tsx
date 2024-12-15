import z from "zod";

export const createMunicipalitieSchema = () =>
  z.object({
    name: z
      .string({ required_error: "El nombre es requerido" })
      .min(1, { message: "El nombre es requerido" }),
    province: z
      .object({
        id: z.number(),
        name: z.string(),
      })
      .nullable()
      .refine((obj) => obj !== null, {
        message: "Es necesario seleccionar una provincia",
      }),
  });
