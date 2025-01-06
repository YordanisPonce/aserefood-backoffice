"use client";
import React from "react";
import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { ZelleConf } from "@/lib/types/zelleConf";
import ZelleConfFormContainer from "../containers/ZelleConfFormContainer";
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { Height } from "@mui/icons-material";
interface Props {
  zelleConf: ZelleConf | undefined;
}

export default function ZellConfCard({ zelleConf }: Props) {
  return (
    <Card sx={{ maxWidth: "1200px"}}>
      <CardContent sx={{display: "flex", flexDirection: "column", gap: 4}}>
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <Typography gutterBottom variant="h5" component="div">
          Zelle Configuration
        </Typography>
        <SettingsSuggestIcon sx={{height: "100px", width: "100px"}} />
        </Box>
        <ZelleConfFormContainer zellConf={zelleConf} />
      </CardContent>
    </Card>
  );
}
