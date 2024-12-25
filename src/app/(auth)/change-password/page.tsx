import ChangePasswordCard from "@/components/partials/ChangePasswordCard/ChangePasswordCard";
import { Box } from "@mui/material";
import React, { Suspense } from "react";

export default function ChangePasswordPage() {
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
      <Suspense>
        <ChangePasswordCard />
      </Suspense>
    </Box>
  );
}

export const dynamic = 'force-dynamic'