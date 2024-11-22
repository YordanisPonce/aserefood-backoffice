"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/config/routes";
import { login } from "@/lib/services/auth";
import { useState } from "react";

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

  const onSubmit = async (data: LoginFormValues) => {
    if (!loading) {
      setLoading(true);
      try {
        await login(data.email, data.password);
        router.push(routes.dashboard.path);
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
