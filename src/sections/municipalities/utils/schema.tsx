import z from "zod";

export const createMunicipalitieSchema = () =>
  z.object({
    name: z.string({ required_error: "El nombre es requerido" }),
    shortDescription: z.string({
      required_error: "La descipción corta es requerida",
    }),
    province: z.object({
      id: z.number(),
      name: z.string(),
    }),
  });
