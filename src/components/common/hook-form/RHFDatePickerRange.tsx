import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";
import RHFDatePicker from "./RHFDatePicker";

interface Props {
  title: string;
  nameInitialDatePicker: string;
  nameFinalDatePicker: string;
  labelInitialDatePicker: string;
  labelFinalDatePicker: string;
}

export default function RHFDatePickerRange({
  title,
  nameFinalDatePicker,
  nameInitialDatePicker,
  labelFinalDatePicker,
  labelInitialDatePicker,
}: Props) {
  const { formState } = useFormContext();
  const { errors } = formState;

  return (
    <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography sx={{ fontSize: "14px", fontWeight: 600, color: "text.primary" }}>{title}</Typography>
        <Divider />
        {errors["dateRange"] && errors["dateRange"].message && (
          <Typography
            fontSize="0.75em"
            sx={{ marginLeft: "12px" }}
            color={"error"}
          >
            {errors["dateRange"].message as string}
          </Typography>
        )}
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <RHFDatePicker
          name={nameInitialDatePicker}
          label={labelInitialDatePicker}
        />
        <RHFDatePicker
          name={nameFinalDatePicker}
          label={labelFinalDatePicker}
        />
      </Box>
    </Box>
  );
}
