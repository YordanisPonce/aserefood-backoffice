import { DiscountOption } from "@/lib/types/promotion";
import z from "zod";

export const createPromotionSchema = () =>
  z
    .object({
      code: z
        .string()
        .min(1, { message: "El código es requerido" })
        .max(10, { message: "El código no puede exceder los 10 carácteres" }),
      name: z.string().min(1, { message: "El nombre es requerido" }),
      description: z.string().min(1, { message: "La descipción es requerida" }),
      discountOption: z.enum([
        DiscountOption.FIXED_AMOUNT,
        DiscountOption.PERCENTAGE,
      ]),
      discountValue: z.number().min(1, {
        message: "El valor de descuento tiene que ser un número positivo",
      }),
      startDate: z
        .string()
        .refine((value) => !isNaN(new Date(value).getTime()), {
          message: "Debe ser una fecha válida",
        }),
      endDate: z.string().refine((value) => !isNaN(new Date(value).getTime()), {
        message: "Debe ser una fecha válida",
      }),
      isActive: z.boolean(),
      productCombos: z
        .array(
          z.object({
            id: z.number(),
            name: z.string(),
          })
        )
        .min(1, { message: "Debe incluir al menos un combo de producto" })
        .refine(
          (items) => {
            const uniqueIds = new Set(items.map((item) => item.id));
            return uniqueIds.size === items.length;
          },
          {
            message: "No se pueden repetir los combos de productos.",
          }
        ),
      products: z
        .array(
          z.object({
            id: z.number(),
            name: z.string(),
          })
        )
        .min(1, { message: "Debe incluir al menos un producto" })
        .refine(
          (items) => {
            const uniqueIds = new Set(items.map((item) => item.id));
            return uniqueIds.size === items.length;
          },
          {
            message: "No se pueden repetir los productos.",
          }
        ),
    })
    .refine(
      (data) => {
        const startDate = new Date(data.startDate);
        const endDate = new Date(data.endDate);
        return startDate <= endDate;
      },
      {
        message:
          "La fecha de inicio debe ser anterior o igual a la fecha de fin.",
        path: ["dateRange"],
      }
    );
