import RHFAutocompleteFetcher from "@/components/common/hook-form/RHFAutocompleteFetcher";
import RHFInputWithLabel from "@/components/common/hook-form/RHFInputWithLabel";
import { getAllProducts } from "@/lib/services/products";
import { getAllZones } from "@/lib/services/zones";
import { Box, Button, CircularProgress, DialogActions } from "@mui/material";
import { FunctionComponent } from "react";

type InventoryEntryFormProps = {
  isLoading: boolean;
  isUpdate: boolean;
};

export const InventoryEntryForm: FunctionComponent<InventoryEntryFormProps> = ({
  isLoading,
  isUpdate,
}) => {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
          <RHFInputWithLabel name="price" label="Precio" type="number" />
          <RHFInputWithLabel name="quantity" label="Cantidad" type="number" />
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
