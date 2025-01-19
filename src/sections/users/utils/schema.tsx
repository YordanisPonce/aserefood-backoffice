import { fileMaxSizeMB } from "@/lib/utils/fileTransformers";
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
      .min(8, {
        message: "La contraseña debe tener al menos 8 caracteres",
      })
      .regex(/(?=.*[0-9])/, {
        message: "La contraseña debe contener al menos un número",
      })
      .regex(/(?=.*[A-Z])/, {
        message: "La contraseña debe contener al menos una letra mayúscula",
      }),
    username: z
      .string({ required_error: "El nombre de usuario es requerido" })
      .min(1, { message: "El nombre de usuario es requerido" }),
    lastnames: z
      .string({ required_error: "Los apellidos son requeridos" })
      .min(1, { message: "Los apellidos son requeridos" }),
    phoneNumber: z
      .string({ required_error: "El número telefónico es requerido" })
      .regex(/^\d+$/, {
        message: "El número telefónico solo debe contener dígitos",
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
    role: z
      .object({
        value: z.string(),
        name: z.string(),
      })
      .refine((obj) => obj !== null, {
        message: "Es necesario seleccionar un rol",
      }),
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
      .regex(/^\d+$/, {
        message: "El número telefónico solo debe contener dígitos",
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
    isActive: z.boolean().optional(),
    isConfirmed: z.boolean().optional(),
    role: z
      .object({
        value: z.string(),
        name: z.string(),
      })
      .refine((obj) => obj !== null, {
        message: "Es necesario seleccionar un rol",
      }),
  });

export const roles: Item[] = [
  { value: "customer", name: "Cliente" },
  { value: "admin", name: "Administrador" },
];

export type Item = {
  value: string;
  name: string;
};
