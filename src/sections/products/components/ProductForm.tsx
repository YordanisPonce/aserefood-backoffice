import RHFAutocompleteFetcher from "@/components/common/hook-form/RHFAutocompleteFetcher";
import RHFInputImageUpload from "@/components/common/hook-form/RHFInputImageUpload";
import RHFInputWithLabel from "@/components/common/hook-form/RHFInputWithLabel";
import RHFRadioGroup from "@/components/common/hook-form/RHFRadioGroup";
import { getAllCategories } from "@/lib/services/categories";
import { getAllProviders } from "@/lib/services/providers";
import { StatesProducts } from "@/lib/types/products";
import { SelectOption } from "@/lib/types/select";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  DialogActions,
} from "@mui/material";
import { FunctionComponent } from "react";

type ProductFormProps = {
  isLoading: boolean;
  isUpdate: boolean;
  error: string | undefined;
};

export const ProductForm: FunctionComponent<ProductFormProps> = ({
  isLoading,
  isUpdate,
  error,
}) => {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {error && <Alert severity="error">{error}</Alert>}
        <RHFInputWithLabel name="name" label="Name" type="text" />
        <Box sx={{ display: "flex", gap: 2 }}>
          <RHFAutocompleteFetcher
            fullWidth
            name="providers"
            label="Proveedores"
            onFetch={getAllProviders}
            multiple={true}
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
        <RHFRadioGroup
          name="isService"
          label="Estado del Producto"
          options={[
            { label: "Con Servicio", value: StatesProducts.SERVICE },
            { label: "Sin Servicio", value: StatesProducts.NOTSERVICE },
          ]}
          direction="row"
        />
        <RHFInputImageUpload name="image" placeholder="Imagen del Producto" />
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
