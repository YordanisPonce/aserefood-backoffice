import { Controller, useFormContext } from "react-hook-form";

import { TextFieldProps } from "@mui/material/TextField";

import InputWithLabel from "../input/InputWithLabel";
import { CSSProperties, ChangeEvent } from "react";

type Props = TextFieldProps & {
  name: string;
  type: string;
  disabled?: boolean;
  size?: "small" | "medium";
  label?: string;
  placeholder?: string;
  underLabel?: string;
  width?: CSSProperties["width"];
  required?: boolean;
  dataTest?: string;
  isNotAccountant?: boolean;
};

export default function RHFInputWithLabel({
  name,
  type,
  disabled,
  size,
  label,
  placeholder,
  underLabel,
  width,
  required,
  dataTest,
  autoComplete,
  isNotAccountant,
  ...rest
}: Props) {
  const { control } = useFormContext();

  const handleChange =
    (onChange: (_: number | string) => void) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      if (type === "number") {
        if (isNotAccountant) {
          return onChange(+event.target.value);
        } else {
          return handleNumberChange(event?.target.value, onChange);
        }
      } else {
        onChange(event?.target.value);
      }
    };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleNumberChange = (value: string, onChange: any) => {
    // Permite números decimales y evita ceros a la izquierda innecesarios
    const decimalValue = value.replace(/^0+(?=\d)/, "");
    if (/^-?\d*\.?\d*$/.test(decimalValue)) {
      onChange(Number(decimalValue));
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onBlur, onChange, value },
        fieldState: { error },
      }) => (
        <InputWithLabel
          {...rest}
          required={required}
          placeholder={placeholder}
          underLabel={underLabel}
          label={label}
          onBlur={onBlur}
          onChange={handleChange(onChange)}
          value={value}
          id={name}
          fieldError={error}
          disabled={disabled}
          type={type}
          size={size}
          width={width}
          dataTest={dataTest}
          autoComplete={autoComplete}
        />
      )}
    />
  );
}
