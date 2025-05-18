import { CSSProperties, ChangeEvent } from "react";
import { FieldError } from "react-hook-form";

import {
  Box,
  InputLabel,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";

type Props = {
  id: string;
  placeholder?: string;
  value: string;
  onChange: (_: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  fieldError?: FieldError;
  label?: string;
  underLabel?: string;
  disabled?: boolean;
  type?: string;
  size?: "small" | "medium";
  width?: CSSProperties["width"];
  required?: boolean;
  dataTest?: string;
  autoComplete?: string;
} & TextFieldProps;

const InputWithLabel = ({
  id,
  placeholder,
  value,
  onChange,
  onBlur,
  fieldError: errorAlert,
  label,
  underLabel,
  disabled,
  type,
  required,
  size = "small",
  width = "100%",
  dataTest,
  autoComplete,
  ...rest
}: Props) => (
  <Box sx={{ width, display: "flex", flexDirection: "column", gap: 1 }}>
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {label && (
          <InputLabel
            htmlFor={id}
            sx={{ fontSize: "14px", fontWeight: 600, color: "text.primary" }}
          >
            {label}
            {required && "*"}
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
      <TextField
        {...rest}
        autoComplete={autoComplete}
        required={required}
        type={type || "text"}
        size={size}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={Boolean(errorAlert)}
        fullWidth
        disabled={disabled}
        data-test={dataTest}      
        inputProps={
          type === "number"
            ? { step: "any", inputMode: "decimal", min: "0" }
            : undefined
        }
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            border: disabled ? "1px dashed rgba(145, 158, 171, 0.20)" : "",
          },
        }}
      />
    </Box>

    {errorAlert && (
      <Typography fontSize="0.75em" sx={{ marginLeft: "12px" }} color={"error"}>
        {errorAlert.message}
      </Typography>
    )}
  </Box>
);

export default InputWithLabel;
