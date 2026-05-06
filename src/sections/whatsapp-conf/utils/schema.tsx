// utils/schema.ts
import { z } from "zod";

export const updateWhatsAppConfSchema = () =>
  z.object({
    phoneNumber: z
      .string({ required_error: "El número telefónico es requerido" })
      .regex(/^\+?\d+$/, {
        message: "El número telefónico debe contener solo dígitos y puede empezar con +",
      }),
  });