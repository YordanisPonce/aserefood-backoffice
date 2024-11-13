import React from "react";
import { Box } from "@mui/material";
import AppBar from "../../components/partials/AppBar/AppBar";
import Drawer from "../../components/partials/Drawer/Drawer";
import { GlobalProvider } from "@/stores/global";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box sx={{ display: "flex" }}>
      <GlobalProvider>
        <AppBar />
        <Drawer />
      </GlobalProvider>
      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, paddingTop: `85px` }}>
        {children}
      </Box>
    </Box>
  );
}
