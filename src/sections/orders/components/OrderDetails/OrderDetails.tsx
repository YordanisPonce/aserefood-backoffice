import React from "react";
import { Box, Typography, Chip, List, Divider } from "@mui/material";
import { ShoppingCart, AttachMoney, LocalShipping } from "@mui/icons-material";
import LoadingScreen from "@/components/common/loading/LoadingScreen";
import ModalFetchingDataError from "@/components/partials/Modal/components/ModalFetchingDataError";
import useOrder from "../../hooks/useOrder";
import {
  orderPaymentSelectionMap,
  orderStatusColorMap,
  orderStatusMap,
  PaymentSelection,
} from "@/lib/types/order";
import DialogSections from "@/sections/components/DialogSections";
import DeliveryMethodDetails from "@/sections/delivery-methods/components/DeliveryMethodDetails";
import OrderDetailsContactInfoSection from "./components/OrderDetailsContactInfoSection";
import OrderDetailsPaymentOnlineSection from "./components/OrderDetailsPaymentOnlineSection/OrderDetailsPaymentOnlineSection";
import OrderDetailsPaymentTransferSection from "./components/OrderDetailsPaymentTransferSection/OrderDetailsPaymentTransferSection";
import useDeliveryMethod from "@/sections/delivery-methods/hooks/useDeliveryMethod";
import ExportButton from "@/components/common/export-to-pdf/export-button";
import ProductRow from "./components/OrderProductRow";
// import PaymentScreenshotCard from "./components/PaymentScreenshot";

interface Props {
  orderId: string | null;
}

export default function OrderDetails({ orderId }: Props) {
  const {
    order,
    loadingData: loadingDataOrder,
    error: errorOrder,
    fetchOrder,
  } = useOrder({
    orderId: orderId,
  });
  const deliveryMethodData = useDeliveryMethod({
    deliveryMethodId: order?.deliveryMethodId.toString() ?? "",
  });
  console.log("orderItesm", { order });
  return (
    <>
      {!loadingDataOrder ? (
        order && !errorOrder ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
            id="exportable-component"
          >
            <Box sx={{ p: 3 }}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
              >
                <ShoppingCart
                  sx={{ fontSize: 40, mr: 2, color: "primary.main" }}
                />
                <Typography
                  id="order-details-modal"
                  variant="h6"
                  component="h2"
                  gutterBottom
                >
                  Orden de Compra: {order.code}
                </Typography>
                <ExportButton
                  orderDetails={order}
                  contactInfo={order.contactInfo}
                  elementId="exportable-component"
                  filename={`Orden ${order.code}`}
                />
              </Box>
              <Chip
                label={orderStatusMap.get(order.status)}
                size="small"
                sx={{ mb: 2 }}
                color={orderStatusColorMap.get(order.status)}
              />
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Detalles de la Orden:
                </Typography>
                <Typography variant="body2">
                  Municipio: {order.municipalityName}
                </Typography>
                <Typography variant="body2">
                  Fecha de creación:{" "}
                  {new Date(order.createdDate).toLocaleString()}
                </Typography>
                <Typography variant="body2">
                  Última actualización:{" "}
                  {new Date(order.updatedDate).toLocaleString()}
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box display="flex" alignItems="center" mb={1}>
                <AttachMoney sx={{ mr: 1 }} color="action" />
                <Typography variant="subtitle2">
                  Información de Pago:
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ pl: 4 }}>
                Método de pago:{" "}
                {orderPaymentSelectionMap.get(order.paymentSelection)}
              </Typography>
              {/* PRECIO */}
              <Typography variant="body2" sx={{ pl: 4 }}>
                Subtotal: ${order.totalAmount}
              </Typography>
              <Typography variant="body2" sx={{ pl: 4 }}>
                Precio de entrega: $
                {deliveryMethodData.deliveryMethod?.cost ?? 0}
              </Typography>
              <Typography variant="body2" sx={{ pl: 4 }}>
                Monto total: $
                {(
                  Number(order.totalAmount) +
                  (deliveryMethodData.deliveryMethod?.cost ?? 0)
                ).toFixed(2)}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box display="flex" alignItems="center" mb={1} gap={1}>
                <LocalShipping sx={{ mr: 1 }} color="action" />
                <Typography variant="subtitle2">Método de Entrega:</Typography>
                <DialogSections
                  buttonTitle="Ver Método de entrega"
                  title="Información del Método de Entrega"
                >
                  <DeliveryMethodDetails
                    deliveryMethodData={deliveryMethodData}
                  />
                </DialogSections>
              </Box>
              <OrderDetailsContactInfoSection
                contactInfoId={order.contactInfoId.toString()}
              />
              {order.paymentSelection === PaymentSelection.Online ? (
                <OrderDetailsPaymentOnlineSection orderId={orderId} />
              ) : (
                <OrderDetailsPaymentTransferSection orderId={orderId} />
              )}

              <Box sx={{ padding: 1 }}></Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                Artículos de la Orden:
              </Typography>
              <List
                dense
                sx={{
                  maxHeight: 200,
                  overflowY: "auto",
                  bgcolor: "background.paper",
                  mb: 2,
                }}
              >
                {order.orderItems.map((item) => (
                  <>
                    {item.product && (
                      <ProductRow
                        id={item.product.id.toString()}
                        imageUrl={item.product.image as string}
                        name={item.product.name}
                        price={item.price}
                        quantity={item.amount}
                      />
                    )}
                    {item.productCombo && (
                      <ProductRow
                        id={item.productCombo.id.toString()}
                        imageUrl={item.productCombo.image as string}
                        name={item.productCombo.name}
                        price={item.price}
                        quantity={item.amount}
                      />
                    )}
                  </>
                ))}
              </List>
            </Box>
          </Box>
        ) : (
          <ModalFetchingDataError
            message={errorOrder as string}
            reset={fetchOrder}
          />
        )
      ) : (
        <LoadingScreen sx={{ height: "100%" }} />
      )}
    </>
  );
}
