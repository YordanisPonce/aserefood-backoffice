"use client";
import RHFInputWithLabel from "@/components/common/hook-form/RHFInputWithLabel";
import { Alert, Box, Button, CircularProgress } from "@mui/material";
import React from "react";

interface Props {
  isLoading: boolean;
  error: string | undefined;
}

export default function WhatsAppConfForm({ error, isLoading }: Props) {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      alignContent={"space-between"}
      gap={4}
      height={"100%"}
    >
      {error && <Alert severity="error">{error}</Alert>}
      <Box display={"flex"} flexDirection={"column"} gap={4}>
        <RHFInputWithLabel
          name="phoneNumber"
          label="Número Telefónico"
          type="text"
        />
      </Box>
      <Button
        type="submit"
        disabled={isLoading}
        startIcon={isLoading ? <CircularProgress size={20} /> : null}
        variant="contained"
      >
        Actualizar WhatsApp Conf
      </Button>
    </Box>
  );
}