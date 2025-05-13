"use client";

import { Card, CardContent, CardHeader, Typography, Box } from "@mui/material";
import Image from "next/image";

export default function PaymentScreenshotCard({ src }: { src: string }) {
  return (
    <Card sx={{ maxWidth: 500, margin: "0 auto" }}>
      <CardHeader
        title={
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: "bold" }}
            align="center"
          >
            Captura de Pantalla del Pago
          </Typography>
        }
      />
      <CardContent>
        <Box display="flex" justifyContent="center" width="100%">
          <Image
            src={src}
            alt="Captura de pantalla del pago"
            width={800}
            height={600}
            style={{ objectFit: "contain" }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
