import RHFAutocompleteFetcher from "@/components/common/hook-form/RHFAutocompleteFetcher";
import RHFInputWithLabel from "@/components/common/hook-form/RHFInputWithLabel";
import { getAllMunicipalities, getAvaliablesMunicipalities } from "@/lib/services/municipalities";
import { Box, Button, CircularProgress, DialogActions } from "@mui/material";
import { FunctionComponent } from "react";

type ZoneFormProps = {
  isLoading: boolean;
  isUpdate: boolean;
};

export const ZoneForm: FunctionComponent<ZoneFormProps> = ({
  isLoading,
  isUpdate,
}) => {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <RHFInputWithLabel name="name" label="Nombre" type="text" />

        <RHFAutocompleteFetcher
          fullWidth
          name="municipalities"
          label="Municipios"
          multiple={true}
          onFetch={getAvaliablesMunicipalities}
          getOptionLabel={(opt) => opt.name}
          getOptionKey={(opt) => opt.id}
          size="small"
        />
        <RHFInputWithLabel
          name="description"
          label="Descripción"
          type="text"
          multiline
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
