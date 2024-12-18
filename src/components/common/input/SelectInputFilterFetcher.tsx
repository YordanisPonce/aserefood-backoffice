import SectionFetchingDataError from "@/components/partials/Modal/components/SectionFetchingDataError";
import {
  MenuItem,
  TextField,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import React from "react";

interface Props {
  label: string;
  options: { id: number; name: string }[];
  isLoading: boolean;
  error: string | undefined;
  value: number | undefined;
  fetcher: () => Promise<void>;
  onChange:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
}

export default function SelectInputFilterFetcher({
  label,
  options,
  isLoading,
  error,
  value,
  fetcher,
  onChange,
}: Props) {
  return (
    <TextField
      select
      label={label}
      variant="outlined"
      value={!value || isLoading || options.length === 0 ? "" : value}
      onChange={onChange}
      fullWidth
    >
      <MenuItem value="">Todos</MenuItem>
      {isLoading ? (
        <MenuItem disabled>
          <Box display="flex" alignItems="center" gap={1}>
            <CircularProgress size={20} />
            <Typography variant="body2">Cargando...</Typography>
          </Box>
        </MenuItem>
      ) : error ? (
        <MenuItem disabled>
          <Typography variant="body2" color="error">
            Error en la carga de datos:{" "}
            <SectionFetchingDataError
              label="Toque para volver a cargar"
              reset={fetcher}
            />
          </Typography>
        </MenuItem>
      ) : options.length > 0 ? (
        options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))
      ) : (
        <MenuItem disabled>
          <Typography variant="body2">No hay opciones disponibles</Typography>
        </MenuItem>
      )}
    </TextField>
  );
}
