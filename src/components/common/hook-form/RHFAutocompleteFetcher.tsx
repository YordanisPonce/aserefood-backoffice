import { useCallback, useEffect, useState } from "react";

import { AutocompleteProps } from "@mui/material";

import RHFAutocomplete from "./RHFAutocomplete";

interface Props<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: React.ReactNode;
  required?: boolean;
  onFetch: () => Promise<T[]>;
  objectValueKey?: string;
  userId?: number;
  onChangeOptional?: VoidFunction;
  exclude?: number[];
}

export default function RHFAutocompleteFetcher<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
>({
  name,
  label,
  helperText,
  placeholder,
  required = false,
  onFetch,
  objectValueKey,
  onChangeOptional,
  exclude,
  ...other
}: Omit<
  Omit<Props<T, Multiple, DisableClearable, FreeSolo>, "renderInput">,
  "options"
>) {
  const [options, setOptions] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadDataAsync = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await onFetch();
      setOptions((prev) => {
        if (res) {
          return res;
        } else return prev;
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [onFetch]);

  useEffect(() => {
    void loadDataAsync();
  }, [loadDataAsync]);

  return (
    <RHFAutocomplete
      onChangeOptional={onChangeOptional}
      name={name}
      label={label}
      helperText={helperText}
      placeholder={placeholder}
      required={required}
      {...other}
      exclude={exclude}
      options={options ?? []}
      loading={isLoading}
      objectValueKey={objectValueKey}
      autoComplete={false}
    />
  );
}
