import { signIn } from "next-auth/react";

export async function login(email: string, password: string) {
  const result = await signIn("credentials", {
    redirect: false,
    email,
    password,
  });

  if (result?.error)
    throw new Error(
      result.error === "fetch failed" ? "Error en la conexión" : result.error
    );
}
