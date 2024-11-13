"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  useTheme,
  Fade,
  Grow,
  Zoom,
} from "@mui/material";
import { ShoppingBag, TrendingUp, Inventory } from "@mui/icons-material";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { routes } from "@/config/routes";

export default function HomePage() {
  const theme = useTheme();

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 4,
          py: 8,
        }}
      >
        <Fade in timeout={1000}>
          <Typography
            variant="subtitle1"
            sx={{
              color: theme.palette.text.secondary,
              textAlign: "center",
              letterSpacing: 1,
            }}
          >
            BIENVENIDO AL PANEL DE CONTROL DE ASERE FOOD
          </Typography>
        </Fade>

        <Grow in timeout={1500}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 4,
            }}
          >
            Gestiona Asere Food
            <br />
            con herramientas poderosas.
          </Typography>
        </Grow>

        <Fade in timeout={2000}>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              mb: 8,
            }}
          >
            <Button type="button" variant="contained" color="primary">
              <Link href={routes.login.path}>Iniciar Sesión</Link>
            </Button>
          </Box>
        </Fade>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(3, 1fr)",
            },
            gap: 4,
            mt: 4,
          }}
        >
          {[
            {
              icon: ShoppingBag,
              title: "Total de Ordenes",
              value: "2,451",
            },
            {
              icon: TrendingUp,
              title: "Ingresos mensuales",
              value: "$12.5k",
            },
            {
              icon: Inventory,
              title: "Productos Activos",
              value: "847",
            },
          ].map((item, index) => {
            return (
              <Zoom
                in
                key={item.title}
                style={{ transitionDelay: `${500 + index * 200}ms` }}
              >
                <Box
                  sx={{
                    p: 4,
                    borderRadius: 2,
                    bgcolor: "background.paper",
                    boxShadow: 1,
                    textAlign: "center",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <item.icon
                    sx={{
                      fontSize: 40,
                      color: theme.palette.primary.main,
                      mb: 2,
                    }}
                  />
                  <Typography variant="h4" fontWeight="bold" mb={1}>
                    {item.value}
                  </Typography>
                  <Typography color="text.secondary">{item.title}</Typography>
                </Box>
              </Zoom>
            );
          })}
        </Box>
      </Box>
    </Container>
  );
}
