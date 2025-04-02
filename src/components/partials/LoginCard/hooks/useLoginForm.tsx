"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/config/routes";
import { useState } from "react";
import { signIn } from "next-auth/react";

const loginSchema = z.object({
  email: z.string().email({
    message: "Ingrese un correo electrónico válido",
  }),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres",
  }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function useLoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async ({ email, password }: LoginFormValues) => {
    if (!loading) {
      setLoading(true);
      try {
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
        if (res?.status === 401) {
          setError("root", { message: "Credenciales inválidas" });
        } else if (res?.status === 200) {
          router.push(routes.products.path);
        }
      } catch (error) {
        console.error(error);
        if (error instanceof Error)
          setError("root", {
            type: "manual",
            message: error.message,
          });
      }
      setLoading(false);
    }
  };

  return { register, handleSubmit: handleSubmit(onSubmit), errors, loading };
}
