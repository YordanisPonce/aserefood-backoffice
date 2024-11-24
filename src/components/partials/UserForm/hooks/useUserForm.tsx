import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const userRegistrationSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  lastnames: z.string().min(1, "Los apellidos son requeridos"),
  email: z.string().email("Ingrese un correo electrónico válido"),
  role: z
    .enum(["admin", "user", "manager"], {
      errorMap: () => ({ message: "Seleccione un rol válido" }),
    })
    .optional()
    .or(z.literal("")),
  username: z
    .string()
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
  phoneNumber: z
    .string()
    .regex(/^\+?[0-9]{10,14}$/, "Ingrese un número de teléfono válido"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial"
    ),
});

type UserRegistrationFormValues = z.infer<typeof userRegistrationSchema>;

export default function useUserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm<UserRegistrationFormValues>({
    resolver: zodResolver(userRegistrationSchema),
    defaultValues: {
      role: "",
    },
  });

  const onSubmit = async (data: UserRegistrationFormValues) => {
    try {
      console.log("Usuario registrado:", data);
    } catch {
      setError("root", {
        type: "manual",
        message: "Error al registrar el usuario. Por favor, intente de nuevo.",
      });
    }
  };

  return { register, handleSubmit: handleSubmit(onSubmit), errors, control };
}
