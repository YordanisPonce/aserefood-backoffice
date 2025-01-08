"use client";
import ModalFetchingDataError from "@/components/partials/Modal/components/ModalFetchingDataError";
import { PaymentOnlineErrors } from "@/lib/types/paymentOnline";
import PaymentOnlineDetails from "@/sections/payments/components/PaymentOnlineDetails/PaymentOnlineDetails";
import usePaymentOnlineOrder from "@/sections/payments/hooks/usePaymentOnlineOrder";
import { Person } from "@mui/icons-material";
import { Alert, Box, CircularProgress, Typography } from "@mui/material";

interface Props {
  orderId: string | null;
}

export default function OrderDetailsPaymentOnlineSection({ orderId }: Props) {
  const { paymentOnline, loadingData, error, fetchPaymentOnlineOrder } =
    usePaymentOnlineOrder({ orderId });
  return (
    <Box sx={{ padding: 1, display: "flex", flexDirection: "column", gap: 1 }}>
      <Box display="flex" alignItems="center" mb={1} gap={1}>
        <Person sx={{ mr: 1 }} color="action" />
        <Typography variant="subtitle2">
          Información de Pago en Linea:
        </Typography>
      </Box>
      {!loadingData ? (
        paymentOnline && !error ? (
          <PaymentOnlineDetails paymentOnline={paymentOnline} />
        ) : error !== PaymentOnlineErrors.NOT_FOUND_PAYMENT_ORDER ? (
          <ModalFetchingDataError
            message={error as string}
            reset={fetchPaymentOnlineOrder}
          />
        ) : (
    
            <Alert severity="info">
              {PaymentOnlineErrors.NOT_FOUND_PAYMENT_ORDER}
            </Alert>
         
        )
      ) : (
        <Box padding={2} display={"flex"} justifyContent={"center"}>
          <CircularProgress size={50} />
        </Box>
      )}
    </Box>
  );
}
