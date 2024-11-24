import RHFAutocompleteFetcher from "@/components/common/hook-form/RHFAutocompleteFetcher";
import RHFInputWithLabel from "@/components/common/hook-form/RHFInputWithLabel";
import { getAllMunicipalities } from "@/lib/services/municipalities";
import { Box, Button, CircularProgress, DialogActions } from "@mui/material";
import { FunctionComponent } from "react";

type CreateZoneFormProps = {
  isLoading: boolean;
};

export const CreateZoneForm: FunctionComponent<CreateZoneFormProps> = ({
  isLoading,
}) => {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <RHFInputWithLabel name="name" label="Nombre" type="text" />

        <RHFAutocompleteFetcher
          fullWidth
          name="municipality"
          label="Municipio"
          onFetch={getAllMunicipalities}
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
          Crear
        </Button>
      </DialogActions>
    </>
  );
};
