import { DiscountOption } from "@/lib/types/promotion";
import { fileMaxSizeMB } from "@/lib/utils/fileTransformers";
import z from "zod";

export const createPromotionSchema = () =>
  z
    .object({
      code: z
        .string({ required_error: "El código es requerido" })
        .min(1, { message: "El código es requerido" })
        .max(10, { message: "El código no puede exceder los 10 carácteres" }),
      name: z
        .string({ required_error: "El nombre es requerido" })
        .min(1, { message: "El nombre es requerido" }),
      description: z
        .string({ required_error: "La descipción es requerida" })
        .min(1, { message: "La descipción es requerida" }),
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
      isActive: z.string(),
      productCombos: z
        .array(
          z.object({
            id: z.number(),
            name: z.string(),
          })
        )
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
        .refine(
          (items) => {
            const uniqueIds = new Set(items.map((item) => item.id));
            return uniqueIds.size === items.length;
          },
          {
            message: "No se pueden repetir los productos.",
          }
        ),
        image: z
              .custom<File>((value) => {
                return !value || value instanceof File;
              }, "Debe seleccionar una imagen")
              .refine((file) => !file || file.type.startsWith("image/"), {
                message: "El archivo debe ser una imagen válida (jpg, png, gif, etc.)",
              })
              .refine((file) => !file || file.size <= fileMaxSizeMB * 1024 * 1024, {
                message:
                  "El tamaño de la imagen no debe exceder los " + fileMaxSizeMB + " MB",
              })
              .optional(),
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
    )
    .refine(
      (data) => data.products.length > 0 || data.productCombos.length > 0,
      {
        message:
          "Debe seleccionar al menos un producto o un combo de productos.",
        path: ["productsOrCombos"],
      }
    );
