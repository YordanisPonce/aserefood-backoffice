"use client";

import { themeOptions } from "@/mui-config";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { ReactNode } from "react";

export default function ClientThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ThemeProvider theme={themeOptions}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
