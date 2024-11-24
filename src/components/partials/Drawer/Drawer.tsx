"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import { Drawer as MuiDrawer } from "@mui/material";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { sections } from "../../../lib/sections";
import { usePathname, useRouter } from "next/navigation";
import { Typography } from "@mui/material";
import { useGlobalContext } from "@/stores/global";
import { TOGGLE_DRAWER_OPEN } from "@/stores/global/types";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export default function Drawer() {
  const {
    state: { isDrawerOpen },
    dispatch,
  } = useGlobalContext();
  const router = useRouter();

  const handleDrawerClose = () => {
    dispatch({ type: TOGGLE_DRAWER_OPEN, payload: false });
  };

  const navigateToSection = (path: string) => () => {
    router.push(path);
    dispatch({ type: TOGGLE_DRAWER_OPEN, payload: false });
  };

  const currentPath = usePathname();

  return (
    <MuiDrawer
      open={isDrawerOpen}
      onClose={handleDrawerClose}
      PaperProps={{ sx: { width: 350 } }}
    >
      <DrawerHeader>
        <Typography sx={{ ml: 7 }} typography={"h5"}>
          Sections
        </Typography>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List sx={{ p: 1 }}>
        {sections.map((section, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              selected={currentPath === section.path}
              onClick={navigateToSection(section.path)}
              sx={{
                minHeight: 48,
                px: 2.5,
                borderRadius: 2,
              }}
            >
              <ListItemIcon>{section.icon}</ListItemIcon>
              <ListItemText primary={section.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </MuiDrawer>
  );
}
