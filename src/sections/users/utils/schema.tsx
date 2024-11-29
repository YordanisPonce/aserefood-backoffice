import z from "zod";

export const createUserSchema = () =>
  z.object({
    name: z.string().min(1, { message: "El nombre es requerido" }),
    email: z.string().email({
      message: "Ingrese un correo electrónico válido",
    }),
    password: z.string().min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    }),
    username: z
      .string()
      .min(1, { message: "El nombre de usuario es requerido" }),
    lastnames: z.string().min(1, { message: "Los apellidos son requeridos" }),
    phoneNumber: z
      .string()
      .min(1, { message: "El número telefónico es requerido" }),
  });

export const updateUserSchema = () =>
  z.object({
    name: z.string().min(1, { message: "El nombre es requerido" }),
    email: z.string().email({
      message: "Ingrese un correo electrónico válido",
    }),
    username: z
      .string()
      .min(1, { message: "El nombre de usuario es requerido" }),
    lastnames: z.string().min(1, { message: "Los apellidos son requeridos" }),
    phoneNumber: z
      .string()
      .min(1, { message: "El número telefónico es requerido" }),
  });
