"use client";

import {
  Box,
  Button,
  Container,
  Typography,
  useTheme,
  Fade,
  Slide,
} from "@mui/material";
import { motion } from "framer-motion";
import { ShoppingBag, TrendingUp, Inventory } from "@mui/icons-material";
import Link from "next/link";

export default function Component() {
  const theme = useTheme();

  const statsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const statItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

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

        <Slide in direction="up" timeout={1000}>
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
            Gestiona tu tienda online
            <br />
            con herramientas poderosas.
          </Typography>
        </Slide>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            mb: 8,
          }}
        >
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: theme.palette.primary.main,
              color: "white",
              px: 4,
              py: 1.5,
              "&:hover": {
                bgcolor: theme.palette.primary.dark,
              },
            }}
          >
            <Link href={"/login"}>Iniciar Sesion</Link>
          </Button>
        </Box>

        <Box
          component={motion.div}
          variants={statsVariants}
          initial="hidden"
          animate="visible"
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
          <Box
            component={motion.div}
            variants={statItemVariants}
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
            <ShoppingBag
              sx={{ fontSize: 40, color: theme.palette.primary.main, mb: 2 }}
            />
            <Typography variant="h4" fontWeight="bold" mb={1}>
              2,451
            </Typography>
            <Typography color="text.secondary">Total Orders</Typography>
          </Box>

          <Box
            component={motion.div}
            variants={statItemVariants}
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
            <TrendingUp
              sx={{ fontSize: 40, color: theme.palette.secondary.main, mb: 2 }}
            />
            <Typography variant="h4" fontWeight="bold" mb={1}>
              $12.5k
            </Typography>
            <Typography color="text.secondary">Monthly Revenue</Typography>
          </Box>

          <Box
            component={motion.div}
            variants={statItemVariants}
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
            <Inventory
              sx={{ fontSize: 40, color: theme.palette.primary.main, mb: 2 }}
            />
            <Typography variant="h4" fontWeight="bold" mb={1}>
              847
            </Typography>
            <Typography color="text.secondary">Productos Activos</Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
