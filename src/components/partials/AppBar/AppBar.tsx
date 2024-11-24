"use client";
import {
  IconButton,
  Toolbar,
  Typography,
  AppBar as MUIAppBar,
  Button,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import React from "react";
import { useGlobalContext } from "@/stores/global";
import { signOut } from "next-auth/react";

export default function AppBar() {
  const { dispatch } = useGlobalContext();
  const handleDrawerOpen = () => {
    dispatch({ type: "TOGGLE_DRAWER_OPEN", payload: true });
  };

  const handleLogOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/login" });
  };

  return (
    <MUIAppBar>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleDrawerOpen}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          AsereFood
        </Typography>
        <Button color="inherit" onClick={handleLogOut}>
          Cerrar Sesión
        </Button>
      </Toolbar>
    </MUIAppBar>
  );
}
