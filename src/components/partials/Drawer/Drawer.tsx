"use client";
import * as React from "react";
import {
  styled,
  useTheme,
  Theme,
  CSSObject,
  alpha,
} from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { sections } from "../../../lib/sections";
import { usePathname, useRouter } from "next/navigation";
import { Typography } from "@mui/material";
import { GlobalContext } from "@/stores/global";
import { TOGGLE_DRAWER_OPEN } from "@/stores/global/types";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const DrawerStyle = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function Drawer() {
  // use the global context
  const { state, dispatch } = React.useContext(GlobalContext);
  const theme = useTheme();
  const currentPath = usePathname();
  const router = useRouter();

  const handleDrawerClose = () => {
    dispatch({ type: TOGGLE_DRAWER_OPEN, payload: false });
  };

  return (
    <DrawerStyle variant="permanent" open={state.isDrawerOpen}>
      <DrawerHeader>
        <Typography sx={{ ml: 7 }} typography={"h5"}>
          Sections
        </Typography>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List sx={{ p: 1 }}>
        {sections.map((section, index) => (
          <ListItem
            key={index}
            disablePadding
            sx={{
              display: "block",
              backgroundColor:
                currentPath === section.path
                  ? alpha(theme.palette.info.main, 0.2)
                  : "white",
              color:
                currentPath === section.path
                  ? theme.palette.info.main
                  : "black",
              borderRadius: 2,
              mt: 1,
            }}
          >
            <ListItemButton
              onClick={() => {
                router.push(section.path);
              }}
              sx={[
                {
                  minHeight: 48,
                  px: 2.5,
                  borderRadius: 2,
                },
                state.isDrawerOpen
                  ? {
                      justifyContent: "initial",
                    }
                  : {
                      justifyContent: "center",
                    },
              ]}
            >
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    justifyContent: "center",
                    color:
                      currentPath === section.path
                        ? theme.palette.info.main
                        : "black",
                  },
                  state.isDrawerOpen
                    ? {
                        mr: 3,
                      }
                    : {
                        mr: "auto",
                      },
                ]}
              >
                {section.icon}
              </ListItemIcon>
              <ListItemText
                primary={section.name}
                sx={[
                  state.isDrawerOpen
                    ? {
                        opacity: 1,
                      }
                    : {
                        opacity: 0,
                      },
                ]}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </DrawerStyle>
  );
}
