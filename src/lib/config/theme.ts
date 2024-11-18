import { createTheme } from "@mui/material";

export const themeOptions = createTheme({
  palette: {
    primary: {
      main: "#393967",
    },
    secondary: {
      main: "#01010e",
    },
  },
  typography: {
    fontFamily: ["Geist Sans", "Geist Mono", "sans-serif"].join(","),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 828,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});
