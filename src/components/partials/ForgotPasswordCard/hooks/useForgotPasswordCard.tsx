import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const forgotPasswordSchema = z.object({
  email: z.string().email("Ingrese un correo electrónico válido"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function useForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      console.log("Solicitud de restablecimiento para:", data.email);
    } catch {
      setError("root", {
        type: "manual",
        message: "Error al procesar la solicitud. Por favor, intente de nuevo.",
      });
    }
  };

  return { register, handleSubmit: handleSubmit(onSubmit), errors };
}
