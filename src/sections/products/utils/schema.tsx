import { fileMaxSizeMB } from "@/lib/utils/fileTransformers";
import z from "zod";

export const createProductSchema = () =>
  z.object({
    name: z
      .string({ required_error: "El nombre es requerido" })
      .min(1, { message: "El nombre es requerido" }),
    shortDescription: z
      .string({ required_error: "La descipción corta es requerida" })
      .min(1, { message: "La descipción corta es requerida" }),
    description: z
      .string({ required_error: "La descipción es requerida" })
      .min(1, { message: "La descipción es requerida" }),
    providers: z
      .array(
        z.object({
          id: z.number(),
          name: z.string(),
        })
      )
      .min(1, { message: "Debe incluir al menos un proveedor" })
      .refine(
        (items) => {
          const uniqueIds = new Set(items.map((item) => item.id));
          return uniqueIds.size === items.length;
        },
        {
          message: "No se pueden repetir los proveedores.",
        }
      ),
    category: z
      .object({
        id: z.number(),
        name: z.string(),
      })
      .nullable()
      .refine((obj) => obj !== null, {
        message: "Es necesario seleccionar una categoría",
      }),
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
  });
