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
        return value instanceof File;
      }, "Debe seleccionar un QR")
      .refine((file) => file instanceof File && file.type.startsWith("image/"), {
        message: "El archivo debe ser una imagen válida (jpg, png, gif, etc.)",
      })
      .refine((file) => file.size <= fileMaxSizeMB * 1024 * 1024, {
        message:
          "El tamaño de la imagen no debe exceder los " + fileMaxSizeMB + " MB",
      }),
  });
