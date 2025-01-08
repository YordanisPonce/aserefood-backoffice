"use client";
import ModalFetchingDataError from "@/components/partials/Modal/components/ModalFetchingDataError";
import { PaymentTransferErrors } from "@/lib/types/paymentTransfer";
import PaymentTransferDetails from "@/sections/payments/components/PaymentTransferDetails/PaymentTransferDetails";
import usePaymentTransferOrder from "@/sections/payments/hooks/usePaymentTranferOrder";
import { Person } from "@mui/icons-material";
import { Alert, Box, CircularProgress, Typography } from "@mui/material";

interface Props {
  orderId: string | null;
}

export default function OrderDetailsPaymentTransferSection({ orderId }: Props) {
  const { paymentTransfer, loadingData, error, fetchPaymentTransfer } =
    usePaymentTransferOrder({ orderId });
  return (
    <Box sx={{ padding: 1, display: "flex", flexDirection: "column", gap: 1 }}>
      <Box display="flex" alignItems="center" mb={1} gap={1}>
        <Person sx={{ mr: 1 }} color="action" />
        <Typography variant="subtitle2">
          Información de Pago en Linea:
        </Typography>
      </Box>
      {!loadingData ? (
        paymentTransfer && !error ? (
          <PaymentTransferDetails paymentTranser={paymentTransfer} />
        ) : error !== PaymentTransferErrors.NOT_FOUND_PAYMENT_ORDER ? (
          <ModalFetchingDataError
            message={error as string}
            reset={fetchPaymentTransfer}
          />
        ) : (
    
            <Alert severity="info">
              {PaymentTransferErrors.NOT_FOUND_PAYMENT_ORDER}
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
