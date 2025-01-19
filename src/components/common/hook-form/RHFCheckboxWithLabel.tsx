import { Controller, useFormContext } from "react-hook-form";
import { Checkbox, Typography, Box } from "@mui/material";

type Props = {
  name: string;
  label: string;
  underLabel?: string;
  disabled?: boolean;
  required?: boolean;
  size?: "small" | "medium";
  dataTest?: string;
};

export default function RHFCheckboxWithLabel({
  name,
  label,
  underLabel,
  disabled,
  required,
  size = "medium",
  dataTest,
}: Props) {
  const { control } = useFormContext();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <>
            <Typography
              component="label"
              htmlFor={name}
              sx={{ fontSize: "14px", fontWeight: 600, color: "text.primary" }}
            >
              {label} {required && "*"}
            </Typography>

            <Checkbox
              id={name}
              onBlur={onBlur}
              onChange={(e) => onChange(e.target.checked)}
              checked={value}
              disabled={disabled}
              size={size}
              data-test={dataTest}
            />

            {underLabel && (
              <Typography
                fontWeight={400}
                fontSize={10}
                sx={{ color: "text.secondary" }}
              >
                {underLabel}
              </Typography>
            )}

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
