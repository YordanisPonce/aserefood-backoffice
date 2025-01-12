import RHFAutocomplete from "@/components/common/hook-form/RHFAutocomplete";
import RHFAutocompleteFetcher from "@/components/common/hook-form/RHFAutocompleteFetcher";
import RHFDateTimePickerRange from "@/components/common/hook-form/RHFDateTimePickerRange";
import RHFInputImageUpload from "@/components/common/hook-form/RHFInputImageUpload";
import RHFInputWithLabel from "@/components/common/hook-form/RHFInputWithLabel";
import RHFRadioGroup from "@/components/common/hook-form/RHFRadioGroup";
import { getAllProductCombos } from "@/lib/services/productCombos";
import { getAllProducts } from "@/lib/services/products";
import {
  CreatePromotion,
  DiscountOption,
  promotionsDiscountOptionMap,
  StatesPromotions,
} from "@/lib/types/promotion";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  DialogActions,
  Typography,
} from "@mui/material";
import { FunctionComponent } from "react";
import { FieldErrors } from "react-hook-form";

type PromotionFormProps = {
  isLoading: boolean;
  isUpdate: boolean;
  error: string | undefined;
  errors: FieldErrors<
    CreatePromotion & {
      productsOrCombos: {
        message: string;
      };
      dateRange: {
        message: string;
      };
    }
  >;
};

export const PromotionForm: FunctionComponent<PromotionFormProps> = ({
  isLoading,
  isUpdate,
  error,
  errors,
}) => {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {error && <Alert severity="error">{error}</Alert>}
        <Box sx={{ display: "flex", gap: 2 }}>
          <RHFInputWithLabel name="code" label="Código" type="text" />
          <RHFInputWithLabel name="name" label="Nombre" type="text" />
        </Box>
        <RHFInputWithLabel name="description" label="Descripción" type="text" />
        <Box sx={{ display: "flex", gap: 1, flexDirection: "column" }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <RHFAutocompleteFetcher
              fullWidth
              name="productCombos"
              label="Combos de Productos"
              onFetch={getAllProductCombos}
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
          {errors.productsOrCombos && (
            <Typography
              fontSize="0.75em"
              sx={{ textAlign: "center" }}
              color={"error"}
            >
              {errors.productsOrCombos.message as string}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <RHFAutocomplete
            name="discountOption"
            label="Opciones de descuento"
            options={[
              promotionsDiscountOptionMap.get(DiscountOption.FIXED_AMOUNT),
              promotionsDiscountOptionMap.get(DiscountOption.PERCENTAGE),
            ]}
            size="small"
            fullWidth
          />
          <RHFInputWithLabel
            name="discountValue"
            label="Descuento"
            type="number"
          />
        </Box>
        <RHFDateTimePickerRange
          title="Intervalo de duración"
          nameInitialDatePicker="startDate"
          nameFinalDatePicker="endDate"
          labelInitialDatePicker="Fecha Inicial"
          labelFinalDatePicker="Fecha Final"
        />
        <RHFRadioGroup
          name="isActive"
          label="Estado de la Promoción"
          options={[
            { label: "Activa", value: StatesPromotions.ACTIVA },
            { label: "Inactiva", value: StatesPromotions.INACTIVA },
          ]}
          direction="row"
        />
        <RHFInputImageUpload
          name="image"
          placeholder="Imagen de la promoción"
          required={true}
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
