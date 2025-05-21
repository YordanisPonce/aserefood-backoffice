"use client";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import useChangePasswordForm from "./hooks/useChangePasswordCard";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useState } from "react";

const LockIcon = styled(LockOutlinedIcon)(({ theme }) => ({
  fontSize: 40,
  padding: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  borderRadius: "50%",
  marginBottom: theme.spacing(1),
}));

export default function ChangePasswordCard() {
  const { register, handleSubmit, errors } = useChangePasswordForm();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);
  const toggleConfirmPasswordVisibility = () => {
    setConfirmShowPassword(prev => !prev);
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
            Cambiar Contraseña
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
              id="newPassword"
              label="Nueva Contraseña"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              {...register("newPassword")}
              error={!!errors.newPassword}
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
              helperText={errors.newPassword?.message}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="confirmPassword"
              label="Confirmar Nueva Contraseña"
              type={confirmShowPassword ? "text" : "password"}
              autoComplete="new-password"
              {...register("confirmPassword")}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={toggleConfirmPasswordVisibility}
                        edge="end"
                      >
                        {confirmShowPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              sx={{ mb: 2 }}
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Cambiar Contraseña
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
