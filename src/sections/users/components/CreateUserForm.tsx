import RHFAutocompleteFetcher from "@/components/common/hook-form/RHFAutocompleteFetcher";
import RHFInputWithLabel from "@/components/common/hook-form/RHFInputWithLabel";
import { getAllCategories } from "@/lib/services/categories";
import { getAllProviders } from "@/lib/services/providers";
import { SelectOption } from "@/lib/types/select";
import { Box, Button, CircularProgress, DialogActions } from "@mui/material";
import { FunctionComponent } from "react";

type CreateUserFormProps = {
  isLoading: boolean;
};

export const CreateUserForm: FunctionComponent<CreateUserFormProps> = ({
  isLoading,
}) => {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
          <RHFInputWithLabel
            name="password"
            label="Contraseña"
            type="password"
          />
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <RHFInputWithLabel
            name="email"
            label="Email"
            type="text"
            multiline
          />
          <RHFInputWithLabel
            name="phoneNumber"
            label="Número Telefónico"
            type="text"
            multiline
          />
        </Box>
      </Box>
      <DialogActions sx={{ px: 3, pb: 0, pt: 2, gap: 2 }}>
        <Button type="reset">Cancelar</Button>
        <Button
          type="submit"
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={20} /> : null}
          variant="contained"
        >
          Crear
        </Button>
      </DialogActions>
    </>
  );
};
