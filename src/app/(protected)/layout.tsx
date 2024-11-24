import React from "react";
import { Box } from "@mui/material";
import AppBar from "../../components/partials/AppBar/AppBar";
import Drawer from "../../components/partials/Drawer/Drawer";
import AuthGuard from "@/components/providers/AuthGuard";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <Box sx={{ display: "flex" }}>
        <AppBar />
        <Drawer />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, paddingTop: `85px`, minWidth: 0 }}
        >
          {children}
        </Box>
      </Box>
    </AuthGuard>
  );
}
