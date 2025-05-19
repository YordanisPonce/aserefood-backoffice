import RHFAutocompleteFetcher from "@/components/common/hook-form/RHFAutocompleteFetcher";
import RHFInputWithLabel from "@/components/common/hook-form/RHFInputWithLabel";
import { getAllProducts } from "@/lib/services/products";
import { getAllZones } from "@/lib/services/zones";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  DialogActions,
} from "@mui/material";
import { FunctionComponent } from "react";

type InventoryEntryFormProps = {
  isLoading: boolean;
  isUpdate: boolean;
  error: string | undefined;
};

export const InventoryEntryForm: FunctionComponent<InventoryEntryFormProps> = ({
  isLoading,
  isUpdate,
  error,
}) => {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {error && <Alert severity="error">{error}</Alert>}
        {!isUpdate && (
          <Box sx={{ display: "flex", gap: 2 }}>
            <RHFAutocompleteFetcher
              fullWidth
              name="product"
              label="Producto"
              onFetch={getAllProducts}
              getOptionLabel={(opt) => opt.name}
              getOptionKey={(opt) => opt.id}
              size="small"
            />
            <RHFAutocompleteFetcher
              fullWidth
              name="zone"
              label="Zona"
              onFetch={getAllZones}
              getOptionLabel={(opt) => opt.name}
              getOptionKey={(opt) => opt.id}
              size="small"
            />
          </Box>
        )}
        <Box sx={{ display: "flex", gap: 2 }}>
          <RHFInputWithLabel
            name="price"
            label="Precio"
            type="number"
            decimal
            isNotAccountant={false}
          />
          <RHFInputWithLabel
            name="quantity"
            label="Cantidad"
            type="number"
            isNotAccountant={false}
          />
        </Box>
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
