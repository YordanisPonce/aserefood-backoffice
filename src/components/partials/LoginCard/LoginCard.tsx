"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Box,
  Alert,
  Button,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import useLoginForm from "./hooks/useLoginForm";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LockIcon = styled(LockOutlinedIcon)(({ theme }) => ({
  fontSize: 40,
  padding: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  borderRadius: "50%",
  marginBottom: theme.spacing(1),
}));

export default function LoginCard() {
  const { register, handleSubmit, errors, loading } = useLoginForm();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };
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
            Iniciar Sesión
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
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
            >
              Iniciar Sesión
              {loading && <CircularProgress size={20} sx={{ ml: 1 }} />}
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
