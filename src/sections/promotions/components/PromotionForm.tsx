import RHFAutocomplete from "@/components/common/hook-form/RHFAutocomplete";
import RHFAutocompleteFetcher from "@/components/common/hook-form/RHFAutocompleteFetcher";
import RHFDatePickerRange from "@/components/common/hook-form/RHFDatePickerRange";
import RHFInputWithLabel from "@/components/common/hook-form/RHFInputWithLabel";
import { getAllProducts } from "@/lib/services/products";
import { getAllProviders } from "@/lib/services/providers";
import { DiscountOption } from "@/lib/types/promotion";
import { Box, Button, CircularProgress, DialogActions } from "@mui/material";
import { FunctionComponent } from "react";

type PromotionFormProps = {
  isLoading: boolean;
  isUpdate: boolean;
};

export const PromotionForm: FunctionComponent<PromotionFormProps> = ({
  isLoading,
  isUpdate,
}) => {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <RHFInputWithLabel name="code" label="Código" type="text" />
          <RHFInputWithLabel name="name" label="Nombre" type="text" />
        </Box>
        <RHFInputWithLabel name="description" label="Descripción" type="text" />
        <Box sx={{ display: "flex", gap: 2 }}>
          <RHFAutocompleteFetcher
            fullWidth
            name="productCombos"
            label="Combos de Productos"
            onFetch={getAllProviders}
            multiple={true}
            getOptionLabel={(opt) => opt.name}
            getOptionKey={(opt) => opt.id}
            size="small"
          />
          <RHFAutocompleteFetcher
            fullWidth
            name="products"
            label="Productos"
            onFetch={getAllProducts}
            multiple={true}
            getOptionLabel={(opt) => opt.name}
            getOptionKey={(opt) => opt.id}
            size="small"
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <RHFAutocomplete
            name="discountOption"
            label="Opciones de descuento"
            options={[DiscountOption.FIXED_AMOUNT, DiscountOption.PERCENTAGE]}
            size="small"
            fullWidth
          />
          <RHFInputWithLabel
            name="discountValue"
            label="Descuento"
            type="number"
          />
        </Box>
        <RHFDatePickerRange
          title="Intervalo de duración"
          nameInitialDatePicker="startDate"
          nameFinalDatePicker="endDate"
          labelInitialDatePicker="Fecha Inicial"
          labelFinalDatePicker="Fecha Final"
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
