import React from "react";
import { Typography, IconButton, Box } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

interface SectionFetchingDataErrorProps {
  label: string;
  reset: () => Promise<void>;
}

const SectionFetchingDataError: React.FC<SectionFetchingDataErrorProps> = ({
  label,
  reset,
}) => {
  return (
    <Box display="flex" alignItems="center">
      <Typography variant="body1" component="span" mr={1}>
        {label}
      </Typography>
      <IconButton size="small" onClick={reset} aria-label="Reintentar carga">
        <RefreshIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default SectionFetchingDataError;
