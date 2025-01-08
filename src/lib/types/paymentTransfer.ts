export interface PaymentTransfer {
  id: 0;
  referencePayment: string;
}

export enum PaymentTransferErrors {
  NOT_FOUND_PAYMENT_ORDER = "No existe Pago por Transferencia asociado a esta orden",
}
