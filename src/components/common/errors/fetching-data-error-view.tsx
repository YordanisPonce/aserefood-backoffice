"use client";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { SeverErrorIllustration } from "../../../assets/illustrations";

import { Box, Stack } from "@mui/material";

// ----------------------------------------------------------------------

export default function FetchingDataError() {
  return (
    <Stack
      sx={{
        py: 2,
        m: "auto",
        maxWidth: 400,
        minHeight: "90vh",
        textAlign: "center",
        justifyContent: "center",
      }}
    >
      <Box>
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Error obteniendo los datos
          </Typography>
        </Box>

        <Box>
          <Typography sx={{ color: "text.secondary" }}>
            Ha ocurrido un error inesperado obteniendo los datos
          </Typography>
        </Box>

        <Box>
          <SeverErrorIllustration
            sx={{ height: 260, width: 260, my: { xs: 5, sm: 10 } }}
          />
        </Box>

        <Button
          size="large"
          variant="contained"
          onClick={() => window.location.reload()}
        >
          Reintentar
        </Button>
      </Box>
    </Stack>
  );
}
