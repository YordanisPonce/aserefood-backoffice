"use client"
import { IconButton, Toolbar, Typography } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import {Menu as MenuIcon} from "@mui/icons-material";
import React from "react";
import { useGlobalContext } from "@/stores/global";
import { TOGGLE_DRAWER_OPEN } from "@/stores/global/types";
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const AppBarStyle = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: 240,
        width: `calc(100% - ${240}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));


export default function AppBar() {
  // use global context
  const {state, dispatch} = useGlobalContext()
  const handleDrawerOpen = () => {
    dispatch({type: TOGGLE_DRAWER_OPEN, payload: true});
  };
  return (
    <AppBarStyle position="fixed" open={state.isDrawerOpen}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={[
            {
              marginRight: 5,
            },
            state.isDrawerOpen && { display: "none" },
          ]}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Asere Food
        </Typography>
      </Toolbar>
    </AppBarStyle>
  );
}
