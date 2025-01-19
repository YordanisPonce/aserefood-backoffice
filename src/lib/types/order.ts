import { SearchParams } from "./pagination";

export interface Order {
  id: number;
  code: string;
  municipalityName: string;
  status: OrderStatus;
  createdDate: string;
  updatedDate: string;
  paymentSelection: number;
  totalAmount: number;
}

export interface OrderDetails {
  id: number;
  code: string;
  municipalityId: number;
  municipalityName: string;
  contactInfoId: number;
  status: OrderStatus;
  createdDate: string;
  updatedDate: string;
  paymentSelection: PaymentSelection;
  totalAmount: number;
  deliveryMethodId: number;
  orderItems: {
    id: number;
    productId: number;
    productComboId: number;
    amount: number;
  }[];
}

export interface UpdateOrder {
  status: string;
}

export interface UpdateOrderDTO {
  status: OrderStatus;
}

export enum OrderStatus {
  PAYMENT_PENDING = 1,
  PROCESSING_PAYMENT = 2,
  PAYED = 3,
  CANCELLED = 4,
  DELIVERED = 5,
  REFUNDED = 6,
}
export const orderStatusArray = [
  { value: OrderStatus.PAYMENT_PENDING, name: "Pendiente de pago" },
  { value: OrderStatus.PROCESSING_PAYMENT, name: "Procesando pago" },
  { value: OrderStatus.PAYED, name: "Pagada" },
  { value: OrderStatus.CANCELLED, name: "Anulada" },
  { value: OrderStatus.DELIVERED, name: "Entregada" },
  { value: OrderStatus.REFUNDED, name: "Reembolsada" },
];
// filters
export interface OrdersFilters extends SearchParams {
  deliveryMethodId?: number;
  municipalityId?: number;
  userId?: number;
  code?: string;
  status?: OrderStatus;
}

export enum PaymentSelection {
  Online = 1,
  Transfer = 2,
}

export const orderPaymentSelectionMap: Map<PaymentSelection, string> = new Map([
  [PaymentSelection.Online, "En línea"],
  [PaymentSelection.Transfer, "Transferencia"],
]);

export const orderStatusMap: Map<OrderStatus, string> = new Map([
  [OrderStatus.PAYMENT_PENDING, "Pendiente de pago"],
  [OrderStatus.PROCESSING_PAYMENT, "Procesando pago"],
  [OrderStatus.PAYED, "Pagado"],
  [OrderStatus.CANCELLED, "Anulada"],
  [OrderStatus.DELIVERED, "Entregada"],
  [OrderStatus.REFUNDED, "Reembolsada"],
]);

export const orderStatusMapInverted: Map<string, OrderStatus> = new Map(
  Array.from(orderStatusMap.entries()).map(([key, value]) => [value, key])
);

export const orderStatusColorMap: Map<
  OrderStatus,
  "error" | "default" | "primary" | "secondary" | "info" | "success" | "warning"
> = new Map([
  [OrderStatus.PAYMENT_PENDING, "warning"],
  [OrderStatus.PROCESSING_PAYMENT, "warning"],
  [OrderStatus.PAYED, "success"],
  [OrderStatus.CANCELLED, "error"],
  [OrderStatus.DELIVERED, "success"],
  [OrderStatus.REFUNDED, "success"],
]);
