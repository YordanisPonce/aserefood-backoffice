import { Controller, useFormContext } from "react-hook-form";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  Box,
} from "@mui/material";
import { CSSProperties } from "react";

type Option = {
  label: string;
  value: string | number;
};

type Props = {
  name: string;
  label?: string;
  options: Option[];
  disabled?: boolean;
  direction?: "row" | "column";
  width?: CSSProperties["width"];
  dataTest?: string;
};

export default function RHFRadioGroup({
  name,
  label,
  options,
  disabled = false,
  direction = "column",
  width = "100%",
  dataTest,
}: Props) {
  const { control } = useFormContext();

  return (
    <Box
      sx={{
        width,
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            {label && (
              <Typography
                component="label"
                htmlFor={name}
                sx={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "text.primary",
                }}
              >
                {label}
              </Typography>
            )}

            <RadioGroup
              row={direction === "row"}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              aria-labelledby={name}
              data-test={dataTest}
            >
              {options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio disabled={disabled} />}
                  label={option.label}
                />
              ))}
            </RadioGroup>

            {error && (
              <Typography
                fontSize="0.75em"
                color="error"
                sx={{ marginLeft: "12px" }}
              >
                {error.message}
              </Typography>
            )}
          </>
        )}
      />
    </Box>
  );
}
