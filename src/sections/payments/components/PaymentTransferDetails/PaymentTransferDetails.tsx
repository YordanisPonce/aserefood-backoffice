import { PaymentTransfer } from "@/lib/types/paymentTransfer";
import { Box, Typography } from "@mui/material";
import React from "react";

interface Props {
  paymentTranser: PaymentTransfer;
}

export default function PaymentTransferDetails({ paymentTranser }: Props) {
  return (
    <Box display={"flex"} gap={2}>
      <Typography>Referencia de pago:</Typography>
      <Typography>{paymentTranser.referencePayment}</Typography>
    </Box>
  );
}
