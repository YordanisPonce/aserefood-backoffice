"use client";

import React, { ReactNode } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";

const StyledCard = styled(Card)(({ theme }) => ({
  width: "100%",
  height: "100%", // Ocupa el 100% del espacio disponible
  maxWidth: 800,
  margin: theme.spacing(2),
  background: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  borderRadius: theme.spacing(2),
  display: "flex",
  flexDirection: "column", // Permite estirar el contenido
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  background: theme.palette.primary.main,
  borderRadius: "50%",
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
  boxShadow: "0 4px 20px 0 rgba(0,0,0,0.2)",
}));

interface Props {
  children: ReactNode;
  title: string;
  icon: ReactNode;
}

export default function Form({ children, title, icon }: Props) {
  return (
    <StyledCard>
      <CardContent
        sx={{
          padding: { xs: 2, sm: 4 },
          flex: "1 1 auto", // Ajusta el tamaño del contenido
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100%", // Ocupar toda la altura disponible
          }}
        >
          <IconWrapper>{icon}</IconWrapper>
          <Typography
            component="h1"
            variant="h4"
            sx={{
              mb: 3,
              fontWeight: 600,
              fontSize: { xs: "1.5rem", sm: "2rem" },
              textAlign: "center",
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              backgroundClip: "text",
              textFillColor: "transparent",
            }}
          >
            {title}
          </Typography>
          {/* Form section */}
          {children}
        </Box>
      </CardContent>
    </StyledCard>
  );
}
