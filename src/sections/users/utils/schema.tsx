import z from "zod";

export const createUserSchema = () =>
  z.object({
    name: z
      .string({ required_error: "El nombre es requerido" })
      .min(1, { message: "El nombre es requerido" }),
    email: z.string({ required_error: "El email es requerido" }).email({
      message: "Ingrese un correo electrónico válido",
    }),
    password: z
      .string({ required_error: "La contraseña es requerida" })
      .min(6, {
        message: "La contraseña debe tener al menos 6 caracteres",
      }),
    username: z
      .string({ required_error: "El nombre de usuario es requerido" })
      .min(1, { message: "El nombre de usuario es requerido" }),
    lastnames: z
      .string({ required_error: "Los apellidos son requeridos" })
      .min(1, { message: "Los apellidos son requeridos" }),
    phoneNumber: z
      .string({ required_error: "El número telefónico es requerido" })
      .min(1, { message: "El número telefónico es requerido" }),
  });

export const updateUserSchema = () =>
  z.object({
    name: z
      .string({ required_error: "El nombre es requerido" })
      .min(1, { message: "El nombre es requerido" }),
    email: z.string({ required_error: "El email es requerido" }).email({
      message: "Ingrese un correo electrónico válido",
    }),
    username: z
      .string({ required_error: "El nombre de usuario es requerido" })
      .min(1, { message: "El nombre de usuario es requerido" }),
    lastnames: z
      .string({ required_error: "Los apellidos son requeridos" })
      .min(1, { message: "Los apellidos son requeridos" }),
    phoneNumber: z
      .string({ required_error: "El número telefónico es requerido" })
      .min(1, { message: "El número telefónico es requerido" }),
  });
