import RHFAutocompleteFetcher from "@/components/common/hook-form/RHFAutocompleteFetcher";
import RHFInputWithLabel from "@/components/common/hook-form/RHFInputWithLabel";
import { getAllProvinces } from "@/lib/services/provinces";
import { Box, Button, CircularProgress, DialogActions } from "@mui/material";
import { FunctionComponent } from "react";

type MunicipalityFormProps = {
  isLoading: boolean;
  isUpdate: boolean;
};

export const MunicipalityForm: FunctionComponent<MunicipalityFormProps> = ({
  isLoading,
  isUpdate,
}) => {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <RHFInputWithLabel name="name" label="Nombre" type="text" />
        <RHFAutocompleteFetcher
          fullWidth
          name="province"
          label="Provincia"
          onFetch={getAllProvinces}
          getOptionLabel={(opt) => opt.name}
          getOptionKey={(opt) => opt.id}
          size="small"
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
