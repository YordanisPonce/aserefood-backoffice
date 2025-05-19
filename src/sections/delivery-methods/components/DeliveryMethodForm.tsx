import RHFAutocompleteFetcher from "@/components/common/hook-form/RHFAutocompleteFetcher";
import RHFInputWithLabel from "@/components/common/hook-form/RHFInputWithLabel";
import RHFRadioGroup from "@/components/common/hook-form/RHFRadioGroup";
import { getAllMunicipalities } from "@/lib/services/municipalities";
import { StatesDeliveryMethods } from "@/lib/types/deliveryMethod";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  DialogActions,
} from "@mui/material";
import { FunctionComponent } from "react";

type DeliveryMethodFormProps = {
  isLoading: boolean;
  isUpdate: boolean;
  error: string | undefined;
};

export const DeliveryMethodForm: FunctionComponent<DeliveryMethodFormProps> = ({
  isLoading,
  isUpdate,
  error,
}) => {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {error && <Alert severity="error">{error}</Alert>}
        <Box sx={{ display: "flex", gap: 2 }}>
          <RHFInputWithLabel name="name" label="Name" type="text" />
          <RHFInputWithLabel
            name="pickUpDirection"
            label="Dirección de recogida"
            type="text"
          />
        </Box>
        <RHFAutocompleteFetcher
          fullWidth
          name="municipality"
          label="Municipio"
          onFetch={getAllMunicipalities}
          getOptionLabel={(opt) => opt.name}
          getOptionKey={(opt) => opt.id}
          size="small"
        />
        <Box sx={{ display: "flex", gap: 2 }}>
          <RHFInputWithLabel
            name="estimatedArrivalTime"
            label="Tiempo de Arrivo Estimado"
            type="text"
          />
          <RHFInputWithLabel name="cost" label="Costo" type="number" />
          <RHFInputWithLabel
            name="minimalDeliveryPrice"
            label="Precio mínimo de entrega"
            type="number"
            decimal
          />
        </Box>
        <RHFRadioGroup
          name="isFree"
          label="Estado de la Promoción"
          options={[
            { label: "Gratis", value: StatesDeliveryMethods.FREE },
            { label: "De Pago", value: StatesDeliveryMethods.PAYMENT },
          ]}
          direction="row"
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
