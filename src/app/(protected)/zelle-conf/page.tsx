import { getZelleConf } from "@/lib/services/zelleConf";
import { ZelleConf } from "@/lib/types/zelleConf";
import ZellConfCard from "@/sections/zelle-conf/components/ZellConfCard";
import { Box } from "@mui/material";
import React from "react";

export default async function ZellConfPage() {
  const zelleConf: ZelleConf | undefined = await getZelleConf();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      <ZellConfCard zelleConf={zelleConf} />
    </Box>
  );
}

export const dynamic = "force-dynamic";
