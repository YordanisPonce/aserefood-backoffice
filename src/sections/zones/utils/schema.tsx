import z from "zod";

export const createZoneSchema = () =>
  z.object({
    name: z.string({ required_error: "El nombre es requerido" }),
    description: z.string({ required_error: "La descipción es requerida" }),
    municipality: z.object({
      id: z.number(),
      name: z.string(),
    }),
  });
