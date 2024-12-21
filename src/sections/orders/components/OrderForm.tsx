import RHFAutocomplete from "@/components/common/hook-form/RHFAutocomplete";
import { OrderStatus, orderStatusMap } from "@/lib/types/order";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  DialogActions,
} from "@mui/material";
import { FunctionComponent } from "react";

type OrderFormProps = {
  isLoading: boolean;
  error: string | undefined;
};

export const OrderForm: FunctionComponent<OrderFormProps> = ({
  isLoading,
  error,
}) => {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {error && <Alert severity="error">{error}</Alert>}
        <RHFAutocomplete
          name="status"
          label="Estado de la Orden"
          options={[
            orderStatusMap.get(OrderStatus.PAYED),
            orderStatusMap.get(OrderStatus.PAYMENT_PENDING),
            orderStatusMap.get(OrderStatus.PROCESSING_PAYMENT),
            orderStatusMap.get(OrderStatus.REFUNDED),
            orderStatusMap.get(OrderStatus.DELIVERED),
            orderStatusMap.get(OrderStatus.CANCELLED),
          ]}
          size="small"
          fullWidth
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
          Actualizar
        </Button>
      </DialogActions>
    </>
  );
};
