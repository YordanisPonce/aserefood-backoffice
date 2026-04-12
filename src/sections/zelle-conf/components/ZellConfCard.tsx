"use client";
import React from "react";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { ZelleConf } from "@/lib/types/zelleConf";
import ZelleConfFormContainer from "../containers/ZelleConfFormContainer";
import { WhatsApp } from "@mui/icons-material";

interface Props {
  zelleConf: ZelleConf | undefined;
}

export default function ZellConfCard({ zelleConf }: Props) {
  return (
    <Card sx={{ maxWidth: "1200px" }}>
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <Typography gutterBottom variant="h4" component="div">
            Configuración de WhatsApp
          </Typography>
          {!zelleConf && (
            <Alert severity="info">
              Inserte por primera vez los datos de la configuración de Zelle
            </Alert>
          )}
          <WhatsApp sx={{ height: "100px", width: "100px" }} />
        </Box>
        <ZelleConfFormContainer zelleConf={zelleConf} />
      </CardContent>
    </Card>
  );
}
