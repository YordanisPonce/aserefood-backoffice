import { JwtPayload } from "@/lib/types/auth";
import { jwtDecode } from "jwt-decode";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "auth/login",
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = await res.json();

        if (!res.ok) {
          throw new Error(
            res.status === 401
              ? "Credenciales inválidas"
              : "Ha ocurrido un error inesperado, intentélo mas tarde"
          );
        }
        const decodeToken = jwtDecode<JwtPayload>(user.accessToken);

        if (decodeToken.role !== "admin")
          return null

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.name = user.name;
        token.email = user.email;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.sub || "",
        name: token.name || "",
        email: token.email || "",
        accessToken: token.accessToken as string,
        refreshToken: token.refreshToken as string,
      };
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};
