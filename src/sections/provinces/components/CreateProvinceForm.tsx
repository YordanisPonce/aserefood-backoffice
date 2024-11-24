
import RHFInputWithLabel from "@/components/common/hook-form/RHFInputWithLabel";
import { Box, Button, CircularProgress, DialogActions } from "@mui/material";
import { FunctionComponent } from "react";

type CreateProvinceFormProps = {
  isLoading: boolean;
};

export const CreateProvinceForm: FunctionComponent<CreateProvinceFormProps> = ({
  isLoading,
}) => {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <RHFInputWithLabel name="name" label="Nombre" type="text" />
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
