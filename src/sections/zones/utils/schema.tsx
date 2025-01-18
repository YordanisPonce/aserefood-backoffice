import z from "zod";

export const createZoneSchema = () =>
  z.object({
    name: z
      .string({ required_error: "El nombre es requerido" })
      .min(1, { message: "El nombre es requerido" }),
    description: z
      .string({ required_error: "La descipción es requerida" })
      .min(1, { message: "La descipción es requerida" }),
    municipalities: z
      .array(
        z.object({
          id: z.number(),
          name: z.string(),
          provinceId: z.number()
        })
      )
      .min(1, { message: "Debe incluir al menos un municipio" })
      .refine(
        (items) => {
          const uniqueIds = new Set(items.map((item) => item.id));
          return uniqueIds.size === items.length;
        },
        {
          message: "No se pueden repetir los municipios",
        }
      ),
  });
