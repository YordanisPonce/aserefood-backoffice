import { Box, Typography } from "@mui/material";
import React, { ReactNode } from "react";

interface Props {
  title: string;
  filters: ReactNode;
}

export default function DetailsSectionHeader({ title, filters }: Props) {
  return (
    <Box display={"flex"} justifyContent={"space-between"}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {filters && filters}
    </Box>
  );
}
