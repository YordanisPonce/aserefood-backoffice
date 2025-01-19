import RHFAutocomplete from "@/components/common/hook-form/RHFAutocomplete";
import RHFCheckboxWithLabel from "@/components/common/hook-form/RHFCheckboxWithLabel";
import RHFInputImageUpload from "@/components/common/hook-form/RHFInputImageUpload";
import RHFInputWithLabel from "@/components/common/hook-form/RHFInputWithLabel";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  DialogActions,
} from "@mui/material";
import { FunctionComponent } from "react";
import { roles } from "../utils/schema";

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
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
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
        <Box sx={{ display: "flex", gap: 2 }}>
          <RHFAutocomplete
            name="role"
            label="Roles"
            options={roles}
            getOptionKey={(opt) => (typeof opt === "string" ? opt : opt.value)}
            getOptionLabel={(opt) => (typeof opt === "string" ? opt : opt.name)}
            defaultValue={roles[0]}
            disableClearable
            size="small"
            fullWidth
          />
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <RHFCheckboxWithLabel name="isActive" label="Activo" size="small" />
          {isUpdate && (
            <RHFCheckboxWithLabel
              name="isConfirmed"
              label="Confirmado"
              size="small"
            />
          )}
        </Box>
        <RHFInputImageUpload
          name="image"
          placeholder="Foto de Pérfil"
          description="Los formatos permitidos son: (jpg, png, gif)"
        />
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
