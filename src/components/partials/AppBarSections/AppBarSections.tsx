"use client";
import React from "react";

import { AppBar, Toolbar, Typography } from "@mui/material";

interface Props {
  title: string;
}

export default function AppBarSections({ title }: Props) {
  return (
    <AppBar position="static" sx={{borderRadius: 2}}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
