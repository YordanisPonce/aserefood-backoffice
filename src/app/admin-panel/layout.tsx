"use client"
import React, { useState } from "react";

import { Box } from "@mui/material";
import AppBar from "./components/AppBar/AppBar";
import Drawer from "./components/Drawer/Drawer";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar drawerOpen={drawerOpen} setdrawerOpen={setDrawerOpen} />
      <Drawer open={drawerOpen} setOpen={setDrawerOpen} />
      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, paddingTop: `85px` }}>
      {children}
      </Box>
    </Box>
  );
}
