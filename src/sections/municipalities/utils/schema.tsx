import z from "zod";

export const createMunicipalitieSchema = () =>
  z.object({
    name: z.string({ required_error: "El nombre es requerido" }),
    province: z.object({
      id: z.number(),
      name: z.string(),
    }),
  });
