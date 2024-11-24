import z from "zod";

export const createUserSchema = () =>
  z.object({
    name: z.string({ required_error: "El nombre es requerido" }),
    email: z.string().email({
      message: "Ingrese un correo electrónico válido",
    }),
    password: z.string().min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    }),
    username: z.string({ required_error: "El nombre de usuario es requerido" }),
    lastnames: z.string({ required_error: "Los apellidos son requeridos" }),
    phoneNumber: z.string({
      required_error: "El número telefónico es requerido",
    }),
  });
