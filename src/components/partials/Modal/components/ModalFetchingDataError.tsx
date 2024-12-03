import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import RefreshIcon from "@mui/icons-material/Refresh";

interface Props {
  message: string;
  reset: () => void;
}

export default function ModalFetchingDataError({ message, reset }: Props) {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          p: 4,
          mt: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          textAlign: "center",
          bgcolor: "background.paper",
        }}
      >
        <ErrorOutlineIcon
          color="error"
          sx={{
            fontSize: 64,
            mb: 2,
            animation: "pulse 2s infinite",
            "@keyframes pulse": {
              "0%": {
                transform: "scale(1)",
                opacity: 1,
              },
              "50%": {
                transform: "scale(1.1)",
                opacity: 0.7,
              },
              "100%": {
                transform: "scale(1)",
                opacity: 1,
              },
            },
          }}
        />

        <Typography variant="h5" component="h2" color="error" gutterBottom>
          Error al cargar los datos
        </Typography>

        <Typography variant="body1" color="text.secondary" paragraph>
          {message}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={reset}
          startIcon={<RefreshIcon />}
          sx={{
            mt: 2,
            px: 4,
            py: 1,
            borderRadius: 2,
            textTransform: "none",
            "&:hover": {
              transform: "scale(1.02)",
              transition: "transform 0.2s",
            },
          }}
        >
          Reintentar
        </Button>
      </Box>
    </Container>
  );
}
