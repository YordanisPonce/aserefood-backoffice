import { getZelleConf } from "@/lib/services/zelleConf";
import { ZelleConf } from "@/lib/types/zelleConf";
import ZellConfCard from "@/sections/zelle-conf/components/ZellConfCard";
import { Box } from "@mui/material";
import React from "react";

export default async function ZellConfPage() {
  let zelleConf: ZelleConf | undefined = undefined;
  try {
    zelleConf = await getZelleConf();
  } catch (error) {
    zelleConf = undefined;
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <ZellConfCard zelleConf={zelleConf} />
    </Box>
  );
}
