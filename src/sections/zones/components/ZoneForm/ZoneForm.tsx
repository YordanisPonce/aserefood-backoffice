import RHFInputWithLabel from "@/components/common/hook-form/RHFInputWithLabel";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  DialogActions,
} from "@mui/material";
import { FunctionComponent } from "react";
import SelectMunicipalityInput from "./components/SelectMunicipalityInput/SelectMunicipalityInput";

type ZoneFormProps = {
  isLoading: boolean;
  isUpdate: boolean;
  error: string | undefined;
};

export const ZoneForm: FunctionComponent<ZoneFormProps> = ({
  isLoading,
  isUpdate,
  error,
}) => {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {error && <Alert severity="error">{error}</Alert>}
        <RHFInputWithLabel name="name" label="Nombre" type="text" />

        <RHFInputWithLabel
          name="description"
          label="Descripción"
          type="text"
          multiline
        />

        <SelectMunicipalityInput />
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
