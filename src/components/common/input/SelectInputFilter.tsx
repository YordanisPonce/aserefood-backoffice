import { MenuItem, TextField, Typography } from "@mui/material";
import React from "react";

interface Props {
  label: string;
  options: { value: number; name: string }[];
  value: number | undefined;
  onChange:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
}

export default function SelectInputFilter({
  label,
  options,
  value,
  onChange,
}: Props) {
  return (
    <TextField
      select
      label={label}
      variant="outlined"
      value={value}
      onChange={onChange}
      fullWidth
    >
      {options.length > 0 ? (
        options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
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
