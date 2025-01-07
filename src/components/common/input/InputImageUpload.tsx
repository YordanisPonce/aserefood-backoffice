import { Box, Button, CircularProgress, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ChangeEvent, MutableRefObject } from "react";
import { FieldError } from "react-hook-form";
import PreviewImage from "@/components/partials/PreviewImage/PreviewImage";
type Props = {
  label?: string;
  placeholder?: string;
  required?: boolean;
  accept?: string;
  underLabel?: string;
  isLoading: boolean;
  errorUpload: string | undefined;
  preview: string | null;
  inputRef: MutableRefObject<HTMLInputElement | null>;
  error: FieldError | undefined;
  onChange: (value: File | null) => void;
  handleFileChange: (
    onChange: (value: File | null) => void
  ) => (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleRemoveImage: (onChange: (value: File | null) => void) => void;
};

const InputImageUpload = ({
  label,
  placeholder = "Selecciona una imagen",
  required = false,
  inputRef,
  accept = "image/*",
  underLabel,
  isLoading,
  preview,
  error,
  errorUpload,
  handleFileChange,
  handleRemoveImage,
  onChange,
}: Props) => (
  <Box>
    {label && (
      <Typography variant="h6" gutterBottom>
        {label}
      </Typography>
    )}
    <Button
      startIcon={<CloudUploadIcon />}
      variant="contained"
      component="label"
    >
      {placeholder + `${!required ? " (Opcional)" : ""}`}
      <input
        type="file"
        accept={accept}
        hidden
        ref={inputRef}
        onChange={handleFileChange(onChange)}
      />
    </Button>

    {!isLoading ? (
      !errorUpload ? (
        preview ? (
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            mt={2}
          >
            <PreviewImage preview={preview} />
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleRemoveImage(onChange)}
              sx={{ mt: 1 }}
            >
              Descartar Imagen
            </Button>
          </Box>
        ) : (
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            mt={2}
          >
            No se ha cargado imagen
          </Box>
        )
      ) : (
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          mt={2}
        >
          <Typography variant="body2" color="error">
            {errorUpload}
          </Typography>
        </Box>
      )
    ) : (
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        mt={2}
      >
        <CircularProgress size={50} />
      </Box>
    )}

    {underLabel && (
      <Typography variant="body2" color="textSecondary">
        {underLabel}
      </Typography>
    )}

    {error && (
      <Typography variant="body2" color="error">
        {error.message}
      </Typography>
    )}
  </Box>
);

export default InputImageUpload;
