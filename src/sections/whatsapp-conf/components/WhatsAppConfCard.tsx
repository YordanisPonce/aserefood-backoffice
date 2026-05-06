"use client";
import React from "react";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { WhatsAppConf } from "@/lib/types/whatsappConf";
import WhatsAppConfFormContainer from "../containers/WhatsAppConfFormContainer";
import { WhatsApp } from "@mui/icons-material";

interface Props {
  whatsappConf: WhatsAppConf | undefined;
}

export default function WhatsAppConfCard({ whatsappConf }: Props) {
  return (
    <Card sx={{ maxWidth: "1200px" }}>
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <Typography gutterBottom variant="h4" component="div">
            Configuración de WhatsApp
          </Typography>
          {!whatsappConf && (
            <Alert severity="info">
              Inserte por primera vez los datos de la configuración de WhatsApp
            </Alert>
          )}
          <WhatsApp sx={{ height: "100px", width: "100px" }} />
        </Box>
        <WhatsAppConfFormContainer whatsappConf={whatsappConf} />
      </CardContent>
    </Card>
  );
}