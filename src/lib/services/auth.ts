import { signIn } from "next-auth/react";

export async function login(email: string, password: string) {
  console.log("Se entro");
  console.log(
    await signIn("credentials", {
      callbackUrl: "/users",
      redirect: false,
      email,
      password,
    })
  );
}
