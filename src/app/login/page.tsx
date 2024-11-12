import React from "react";
import LoginCard from "./components/LoginCard/LoginCard";
import { Box } from "@mui/material";

export default function Login() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <LoginCard />
    </Box>
  );
}
