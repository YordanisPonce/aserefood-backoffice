import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller, useFormContext } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

interface Props {
  name: string;
  label: string;
}

export default function RHFDateTimePicker({ name, label }: Props) {
  const { control } = useFormContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DateTimePicker 
            {...field}
            label={label}
            value={field.value ? dayjs(field.value) : null}
            onChange={(newValue) => {
              field.onChange(newValue ? newValue.toISOString() : null);
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
}
