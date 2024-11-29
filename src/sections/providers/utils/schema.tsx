import z from "zod";
export const createProviderSchema = () =>
  z.object({
    name: z.string().min(1, { message: "El nombre es requerido" }),
  });
