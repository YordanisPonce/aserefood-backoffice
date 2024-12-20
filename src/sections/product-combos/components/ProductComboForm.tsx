import RHFAutocompleteFetcher from "@/components/common/hook-form/RHFAutocompleteFetcher";
import RHFInputImageUpload from "@/components/common/hook-form/RHFInputImageUpload";
import RHFInputWithLabel from "@/components/common/hook-form/RHFInputWithLabel";
import RHFList from "@/components/common/hook-form/RHFList";
import RHFRadioGroup from "@/components/common/hook-form/RHFRadioGroup";
import { getAllZones } from "@/lib/services/zones";
import { StatesProductCombos } from "@/lib/types/productCombo";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  DialogActions,
} from "@mui/material";
import { FunctionComponent } from "react";

type ProductComboFormProps = {
  isLoading: boolean;
  isUpdate: boolean;
  error: string | undefined;
};

export const ProductComboForm: FunctionComponent<ProductComboFormProps> = ({
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
          <RHFInputWithLabel
            name="shortDescription"
            label="Descripción Corta"
            type="text"
          />
        </Box>
        <RHFInputWithLabel name="description" label="Descripción" type="text" />

        <Box sx={{ display: "flex", gap: 2 }}>
          <RHFAutocompleteFetcher
            fullWidth
            name="zone"
            label="Zona"
            onFetch={getAllZones}
            getOptionLabel={(opt) => opt.name}
            getOptionKey={(opt) => opt.id}
            size="small"
          />
          <RHFInputWithLabel name="price" label="Precio" type="number" />
        </Box>
        <RHFRadioGroup
          name="isActive"
          label="Estado del Combo"
          options={[
            { label: "Activo", value: StatesProductCombos.ACTIVE },
            { label: "Inactivo", value: StatesProductCombos.INACTIVE },
          ]}
          direction="row"
        />
        <RHFList<{ product: string; amount: string }>
          name="productComboItems"
          titleList="Artículos"
          titleButton="Agregar Artículo"
          noDataText="Inserte Articulos como parte del Combo"
          propertyMap={{ product: "Producto", amount: "Importe" }}
        />
        <RHFInputImageUpload name="image" placeholder="Imagen del Combo" />
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
