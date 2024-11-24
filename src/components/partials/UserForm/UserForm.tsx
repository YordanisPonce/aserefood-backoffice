"use client"
import React from "react";
import useUserForm from "./hooks/useUserForm";
import { styled } from "@mui/system";
import {
  Box,
  Alert,
  MenuItem,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import PhoneIcon from "@mui/icons-material/Phone";
import LockIcon from "@mui/icons-material/Lock";
import { Controller } from "react-hook-form";
const FormSection = styled(Box)(({ theme }) => ({
  marginBottom: 0,
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(3),
  },
  background: "rgba(255, 255, 255, 0.8)",
  borderRadius: theme.spacing(1),
  flexGrow: 1, 
}));

export default function UserForm() {
  const { register, handleSubmit, errors, control } = useUserForm();
  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1, 
        gap: 2, 
      }}
    >
      {errors.root?.message && (
        <Alert severity="error" sx={{ width: "100%", mb: 3 }}>
          {errors.root.message}
        </Alert>
      )}
      <FormSection>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            color: "primary.main",
            fontSize: { xs: "1.1rem", sm: "1.25rem" },
          }}
        >
          Información Personal
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
          }}
        >
          <TextField
            required
            fullWidth
            id="name"
            label="Nombre"
            autoComplete="given-name"
            autoFocus
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <BadgeIcon color="primary" />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            required
            fullWidth
            id="lastnames"
            label="Apellidos"
            autoComplete="family-name"
            {...register("lastnames")}
            error={!!errors.lastnames}
            helperText={errors.lastnames?.message}
          />
        </Box>
      </FormSection>

      <FormSection>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            color: "primary.main",
            fontSize: { xs: "1.1rem", sm: "1.25rem" },
          }}
        >
          Información de Contacto
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
          }}
        >
          <TextField
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            autoComplete="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{ mb: 2 }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="primary" />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            required
            fullWidth
            id="phoneNumber"
            label="Número de Teléfono"
            autoComplete="tel"
            {...register("phoneNumber")}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon color="primary" />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
      </FormSection>

      <FormSection>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            color: "primary.main",
            fontSize: { xs: "1.1rem", sm: "1.25rem" },
          }}
        >
          Detalles de la Cuenta
        </Typography>
        <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.role}>
          <InputLabel id="role-label">Rol</InputLabel>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select {...field} labelId="role-label" label="Rol">
                <MenuItem value="admin">Administrador</MenuItem>
                <MenuItem value="user">Usuario</MenuItem>
                <MenuItem value="guest">Invitado</MenuItem>
              </Select>
            )}
          />
          {errors.role && (
            <Typography color="error">{errors.role.message}</Typography>
          )}
        </FormControl>

        <TextField
          required
          fullWidth
          id="username"
          label="Nombre de Usuario"
          autoComplete="username"
          {...register("username")}
          error={!!errors.username}
          helperText={errors.username?.message}
          sx={{ mb: 2 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <BadgeIcon color="primary" />
                </InputAdornment>
              ),
            },
          }}
        />

        <TextField
          required
          fullWidth
          id="password"
          label="Contraseña"
          type="password"
          autoComplete="new-password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="primary" />
                </InputAdornment>
              ),
            },
          }}
        />
      </FormSection>
      <FormSection>
        <Box sx={{ display: "flex", flexDirection: "row-reverse", gap: 1 }}>
          <Button variant="contained" type="submit">
            Aceptar
          </Button>
          <Button variant="contained" type="reset">
            Reiniciar
          </Button>
        </Box>
      </FormSection>
    </Box>
  );
}
