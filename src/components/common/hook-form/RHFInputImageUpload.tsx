import { Controller, useFormContext } from "react-hook-form";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import {
  compressImage,
  fileMaxSizeMB,
  fileToBase64,
} from "@/lib/utils/fileTransformers";
import InputImageUpload from "../input/InputImageUpload";

type Props = {
  name: string;
  label?: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  accept?: string;
  underLabel?: string;
};

export default function RHFInputImageUpload({
  name,
  label,
  description,
  required = false,
  placeholder = "Selecciona una imagen",
  accept = "image/*",
  underLabel,
}: Props) {
  const { control, getValues } = useFormContext();
  const value = getValues(name);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [errorUpload, setErrorUpload] = useState<string | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange =
    (onChange: (value: File | null) => void) =>
    async (event: ChangeEvent<HTMLInputElement>) => {
      setLoading(true);
      setErrorUpload(undefined);
      const files = event.target.files;
      if (files && files[0]) {
        const file = await compressImage(files[0], 1, 1600);

        if (file.size <= fileMaxSizeMB * 1024 * 1024) {
          onChange(file);
        } else {
          setErrorUpload(
            "El tamaño de la imagen excede los " + fileMaxSizeMB + " MB"
          );
          setPreview(null);
          onChange(null);
        }
      }
      setLoading(false);
    };

  const handleRemoveImage = (onChange: (value: File | null) => void) => {
    setPreview(null);
    onChange(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  const convertImage = useCallback(
    async (file: File) => {
      setPreview(await fileToBase64(file));
    },
    []
  );
  useEffect(() => {
    if (value) convertImage(value);
  }, [value, getValues, name, convertImage]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <InputImageUpload
          handleFileChange={handleFileChange}
          handleRemoveImage={handleRemoveImage}
          inputRef={inputRef}
          isLoading={isLoading}
          errorUpload={errorUpload}
          onChange={onChange}
          preview={preview}
          error={error}
          accept={accept}
          placeholder={placeholder}
          underLabel={underLabel}
          label={label}
          description={description}
          required={required}
        />
      )}
    />
  );
}
