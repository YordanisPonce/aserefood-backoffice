import ForgotPasswordCard from "@/components/partials/ForgotPasswordCard/ForgotPasswordCard";
import { Box } from "@mui/material";
import React from "react";

export default function ForgotPasswordPage() {
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
      <ForgotPasswordCard />
    </Box>
  );
}
