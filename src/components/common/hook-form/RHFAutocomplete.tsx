import { Controller, useFormContext } from "react-hook-form";

import { CircularProgress, InputLabel, Stack } from "@mui/material";
import Autocomplete, {
  AutocompleteProps,
  AutocompleteRenderInputParams,
} from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useRef } from "react";

interface Props<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  name: string;
  label?: string;
  placeholder?: string;
  exclude?: number[];
  helperText?: React.ReactNode;
  required?: boolean;
  objectValueKey?: string;
  onChangeOptional?: VoidFunction;
  onScrollEnd?: VoidFunction;
  fullWidth?: boolean;
}

export default function RHFAutocomplete<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>({
  name,
  label,
  helperText,
  placeholder,
  required = false,
  exclude,
  onChangeOptional,
  onScrollEnd,
  fullWidth,
  ...other
}: Omit<Props<T, Multiple, DisableClearable, FreeSolo>, "renderInput">) {
  const { control } = useFormContext();

  const { options, disabled } = other;

  if (exclude)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    other.options = options.filter((option: any) => {
      if (!exclude.find((exc) => exc == option.id)) return option;
    });

  const changeHandler = (onChange: () => void) => {
    onChangeOptional?.();
    onChange();
  };

  const listRef = useRef<HTMLUListElement | null>(null);

  const handleScroll = () => {
    const listbox = listRef.current;
    if (listbox) {
      const scrollPosition = listbox.scrollTop + listbox.offsetHeight;
      const scrollHeight = listbox.scrollHeight;
      const threshold = 0.8;
      if (scrollPosition >= scrollHeight * threshold) {
        onScrollEnd?.();
      }
    }
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <Stack spacing={0.5} sx={{ width: fullWidth ? "100%" : "auto" }}>
            {label && (
              <InputLabel
                htmlFor={name}
                id={`${name}-label`}
                required={required}
                sx={{
                  fontWeight: 600,
                  color: "text.primary",
                  paddingBottom: 1,
                }}
              >
                {label}
              </InputLabel>
            )}
            <Autocomplete
              {...field}
              id={`autocomplete-${name}`}
              onChange={(event, e) => changeHandler(() => field.onChange(e))}
              ListboxProps={{ onScroll: handleScroll, ref: listRef }}
              renderInput={(params: AutocompleteRenderInputParams) => {
                return (
                  <TextField
                    {...params}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderStyle: disabled ? "dashed" : "",
                        },
                      },
                    }}
                    required={required}
                    placeholder={placeholder}
                    error={!!error}
                    helperText={error ? error?.message : helperText}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password",
                      "aria-labelledby": `${name}-label`,
                    }}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {other.loading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                );
              }}
              {...other}
            />
          </Stack>
        );
      }}
    />
  );
}
