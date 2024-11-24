import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClientThemeProvider from "@/components/providers/ClientThemeProvider";
import { GlobalProvider } from "@/stores/global";
import AuthProvider from "@/components/providers/AuthProvider";

const geistSans = localFont({
  src: "../lib/config/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../lib/config/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AsereFood Backoffice",
  description: "AsereFood management panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
          <GlobalProvider>
            <ClientThemeProvider> {children} </ClientThemeProvider>
          </GlobalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
