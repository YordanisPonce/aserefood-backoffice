import RHFAutocompleteFetcher from "@/components/common/hook-form/RHFAutocompleteFetcher";
import RHFInputWithLabel from "@/components/common/hook-form/RHFInputWithLabel";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  DialogActions,
} from "@mui/material";
import { FunctionComponent } from "react";
import { CategoryFormModality } from "../containers/CategoryFormContainer";
import { SelectOption } from "@/lib/types/select";

type CategoryFormProps = {
  isLoading: boolean;
  formModality: CategoryFormModality;
  error: string | undefined;
  getAllCategoriesFetch: () => Promise<SelectOption[]>;
};

export const CategoryForm: FunctionComponent<CategoryFormProps> = ({
  isLoading,
  formModality,
  error,
  getAllCategoriesFetch,
}) => {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {error && <Alert severity="error">{error}</Alert>}
        <RHFInputWithLabel name="name" label="Name" type="text" />

        {!(formModality === CategoryFormModality.CreateSubCategory) && (
          <RHFAutocompleteFetcher
            fullWidth
            name="parent"
            label="Categoría Padre"
            onFetch={getAllCategoriesFetch}
            getOptionLabel={(opt) => opt.name}
            getOptionKey={(opt) => opt.id}
            size="small"
          />
        )}

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
          {formModality === CategoryFormModality.UpdateCategory
            ? "Actualizar"
            : "Crear"}
        </Button>
      </DialogActions>
    </>
  );
};
