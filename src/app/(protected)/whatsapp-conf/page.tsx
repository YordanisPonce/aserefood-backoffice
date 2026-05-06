import { getWhatsAppConf } from "@/lib/services/whatsappConf";
import { WhatsAppConf } from "@/lib/types/whatsappConf";
import WhatsAppConfCard from "@/sections/whatsapp-conf/components/WhatsAppConfCard";
import { Box } from "@mui/material";
import React from "react";

export default async function WhatsAppConfPage() {
  const WhatsAppConf: WhatsAppConf | undefined = await getWhatsAppConf();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      <WhatsAppConfCard whatsappConf={WhatsAppConf} />
    </Box>
  );
}

export const dynamic = "force-dynamic";
