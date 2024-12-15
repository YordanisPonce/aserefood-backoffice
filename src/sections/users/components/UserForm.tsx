import RHFInputWithLabel from "@/components/common/hook-form/RHFInputWithLabel";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  DialogActions,
} from "@mui/material";
import { FunctionComponent } from "react";

type UserFormProps = {
  isLoading: boolean;
  isUpdate: boolean;
  error: string | undefined;
};

export const UserForm: FunctionComponent<UserFormProps> = ({
  isLoading,
  isUpdate,
  error,
}) => {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {error && <Alert severity="error">{error}</Alert>}
        <Box sx={{ display: "flex", gap: 2 }}>
          <RHFInputWithLabel name="name" label="Nombre" type="text" />
          <RHFInputWithLabel name="lastnames" label="Apellidos" type="text" />
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <RHFInputWithLabel
            name="username"
            label="Nombre de Usuario"
            type="text"
          />
          {!isUpdate && (
            <RHFInputWithLabel
              name="password"
              label="Contraseña"
              type="password"
            />
          )}
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <RHFInputWithLabel name="email" label="Email" type="text" multiline />
          <RHFInputWithLabel
            name="phoneNumber"
            label="Número Telefónico"
            type="text"
            multiline
          />
        </Box>
      </Box>
      <DialogActions sx={{ px: 0, pb: 0, pt: 2, gap: 2 }}>
        <Button type="reset">Cancelar</Button>
        <Button
          type="submit"
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={20} /> : null}
          variant="contained"
        >
          {isUpdate ? "Actualizar" : "Crear"}
        </Button>
      </DialogActions>
    </>
  );
};
