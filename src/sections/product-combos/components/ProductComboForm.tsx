import RHFAutocompleteFetcher from "@/components/common/hook-form/RHFAutocompleteFetcher";
import RHFInputWithLabel from "@/components/common/hook-form/RHFInputWithLabel";
import RHFList from "@/components/common/hook-form/RHFList";
import { getAllZones } from "@/lib/services/zones";
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

        <RHFList<{ product: string; amount: string }>
          name="productComboItems"
          titleList="Artículos"
          titleButton="Agregar Artículo"
          noDataText="Inserte Articulos como parte del Combo"
          propertyMap={{ product: "Producto", amount: "Importe" }}
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
