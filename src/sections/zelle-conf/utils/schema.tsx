import { fileMaxSizeMB } from "@/lib/utils/fileTransformers";
import { z } from "zod";

export const updateZelleConfSchema = () =>
  z.object({
    phoneNumber: z
      .string({ required_error: "El número telefónico es requerido" })
      .regex(/^\d+$/, {
        message: "El número telefónico solo debe contener dígitos",
      }),
    qr: z
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
