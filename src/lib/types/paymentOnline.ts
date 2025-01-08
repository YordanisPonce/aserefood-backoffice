export interface PaymentOnline {
  id: number;
  orderId: number;
  paymentCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;
}

export enum PaymentOnlineErrors {
  NOT_FOUND_PAYMENT_ORDER = "No existe Pago en Linea asociado a esta orden",
}
