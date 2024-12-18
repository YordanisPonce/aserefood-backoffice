import { Box, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import Filters from "../Filters/Filters";

interface Props {
  title: string;
  filters: { handleReset: () => void; component: ReactNode };
}

export default function DetailsSectionHeader({ title, filters }: Props) {
  return (
    <Box display={"flex"} justifyContent={"space-between"}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {filters && (
        <Filters
          handleReset={filters.handleReset}
          contentFilters={filters.component}
        />
      )}
    </Box>
  );
}
