"use client";

import React from "react";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { styled } from "@mui/system";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Button from "@/components/ui/Button";
import Link from "next/link";
import useForgotPasswordForm from "./hooks/useForgotPasswordCard";
import { routes } from "@/lib/config/routes";

const LockIcon = styled(LockOutlinedIcon)(({ theme }) => ({
  fontSize: 40,
  padding: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  borderRadius: "50%",
  marginBottom: theme.spacing(1),
}));

export default function ForgotPasswordCard() {
  const { register, handleSubmit, errors } = useForgotPasswordForm();

  return (
    <Card
      sx={{
        maxWidth: 400,
        width: "100%",
        boxShadow: "0 4px 20px 0 rgba(0,0,0,0.1)",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 12px 30px 0 rgba(0,0,0,0.2)",
        },
      }}
    >
      <CardContent sx={{ padding: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <LockIcon />
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            ¿Olvidaste tu contraseña?
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, textAlign: "center" }}>
            Ingresa tu correo electrónico y te enviaremos instrucciones para
            restablecer tu contraseña.
          </Typography>
          {errors.root?.message && (
            <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
              {errors.root.message}
            </Alert>
          )}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              autoComplete="email"
              autoFocus
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{ mb: 2 }}
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Enviar
            </Button>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Link href={routes.login.path}>Volver al inicio de sesión</Link>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
