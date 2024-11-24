import RHFAutocompleteFetcher from "@/components/common/hook-form/RHFAutocompleteFetcher";
import RHFInputWithLabel from "@/components/common/hook-form/RHFInputWithLabel";
import { getAllCategories } from "@/lib/services/categories";
import { getAllProviders } from "@/lib/services/providers";
import { SelectOption } from "@/lib/types/select";
import { Box, Button, CircularProgress, DialogActions } from "@mui/material";
import { FunctionComponent } from "react";

type CreateProductFromProps = {
  isLoading: boolean;
  isUpdate: boolean;
};

export const CreateProductFrom: FunctionComponent<CreateProductFromProps> = ({
  isLoading,
  isUpdate,
}) => {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <RHFInputWithLabel name="name" label="Name" type="text" />
        <Box sx={{ display: "flex", gap: 2 }}>
          <RHFAutocompleteFetcher
            fullWidth
            name="provider"
            label="Proveedor"
            onFetch={getAllProviders}
            getOptionLabel={(opt) => opt.name}
            getOptionKey={(opt) => opt.id}
            size="small"
          />
          <RHFAutocompleteFetcher<SelectOption>
            fullWidth
            name="category"
            label="Categoría"
            onFetch={getAllCategories}
            getOptionLabel={(opt) => opt.name}
            getOptionKey={(opt) => opt.id}
            size="small"
          />
        </Box>
        <RHFInputWithLabel
          name="shortDescription"
          label="Descripción corta"
          type="text"
          multiline
        />
        <RHFInputWithLabel
          name="description"
          label="Descripción"
          type="text"
          multiline
        />
      </Box>
      <DialogActions sx={{ px: 3, pb: 0, pt: 2, gap: 2 }}>
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
