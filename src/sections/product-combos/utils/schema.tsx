import { fileMaxSizeMB } from "@/lib/utils/fileTransformers";
import z from "zod";

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string().url(),
  isService: z.boolean(),
  categories: z.array(categorySchema),
  shortDescription: z.string(),
  description: z.string(),
});

export const zoneProductSchema = z.object({
  product: productSchema,
  inventoryAmount: z.number(),
  price: z.number(),
  isAvailable: z.boolean(),
});

export const createProductComboItemSchema = () =>
  z.object({
    product: zoneProductSchema.nullable().refine(obj => obj !== null, {
      message: "Es necesario seleccionar un producto",
    }),
    amount: z.number().min(1, { message: "La cantidad es requerida" }),
  });

export const createProductComboSchema = () =>
  z.object({
    name: z
      .string({ required_error: "El nombre es requerido" })
      .min(1, { message: "El nombre es requerido" }),
    shortDescription: z
      .string({ required_error: "La descripción corta es requerida" })
      .min(1, { message: "La descripción corta es requerida" }),
    description: z
      .string({ required_error: "La descripción es requerida" })
      .min(1, { message: "La descripción es requerida" }),
    price: z
      .number()
      .min(0.1, { message: "El precio debe ser un número positivo" }),
    zone: z
      .object({
        id: z.number(),
        name: z.string(),
      })
      .nullable()
      .refine((obj) => obj !== null, {
        message: "Es necesario seleccionar una zona",
      }),
    isActive: z.string(),
    productComboItems: z
      .array(createProductComboItemSchema())
      .min(1, { message: "Debe agregar al menos un artículo" }),
    image: z
      .custom<File>((value) => {
        return value instanceof File;
      }, "Debe seleccionar una Imagen para el combo de producto")
      .refine(
        (file) => file instanceof File && file.type.startsWith("image/"),
        {
          message:
            "El archivo debe ser una imagen válida (jpg, png, gif, etc.)",
        }
      )
      .refine((file) => file.size <= fileMaxSizeMB * 1024 * 1024, {
        message:
          "El tamaño de la imagen no debe exceder los " + fileMaxSizeMB + " MB",
      }),
  });
