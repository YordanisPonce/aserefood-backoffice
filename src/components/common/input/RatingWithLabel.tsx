import { SyntheticEvent } from "react";
import { FieldError } from "react-hook-form";

import { Box, InputLabel, Rating, Typography } from "@mui/material";

import { error } from "src/theme/colors";

interface Props {
  id: string;
  value: string;
  onChange: (_: SyntheticEvent<Element>) => void;
  onBlur: () => void;
  error?: FieldError;
  label?: string;
  underLabel?: string;
  disabled?: boolean;
  width?: string | number;
  required?: boolean;
}

const RatingWithLabel = ({
  id,
  value,
  onChange,
  onBlur,
  error: errorAlert,
  label,
  underLabel,
  disabled,
  required,
  width = "100%",
}: Props) => (
  <Box
    sx={{ width: `${width}`, display: "flex", flexDirection: "column", gap: 1 }}
  >
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {label && (
          <InputLabel
            htmlFor={id}
            sx={{ fontSize: "14px", fontWeight: 600, color: "text.primary" }}
          >
            {label}
            {required && " *"}
          </InputLabel>
        )}
        {underLabel && (
          <Typography
            fontWeight={400}
            fontSize={10}
            sx={{ color: "text.secondary" }}
          >
            {underLabel}
          </Typography>
        )}
      </Box>
      <Rating
        id={id}
        value={Number(value)}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
      />
    </Box>

    {errorAlert && (
      <Typography
        fontSize="0.75em"
        sx={{ marginLeft: "12px" }}
        color={error.main}
      >
        {errorAlert.message}
      </Typography>
    )}
  </Box>
);

export default RatingWithLabel;
