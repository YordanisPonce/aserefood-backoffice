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
  value: number | number[] | undefined;
  fetcher: () => Promise<void>;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  multiple?: boolean;
}

export default function SelectInputFilterFetcher({
  label,
  options,
  isLoading,
  error,
  value,
  fetcher,
  onChange,
  multiple = false, // Propiedad para habilitar multiselección
}: Props) {
  return (
    <TextField
      select
      label={label}
      variant="outlined"
      value={
        !value || isLoading || options.length === 0 ? (multiple ? [] : "") : value
      }
      onChange={onChange}
      fullWidth
      SelectProps={{
        multiple, // Habilitar multiselección en las propiedades del Select
      }}
    >
      {!multiple && <MenuItem value="">Todos</MenuItem>}
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
