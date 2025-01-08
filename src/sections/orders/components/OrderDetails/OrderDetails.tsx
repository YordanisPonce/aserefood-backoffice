import React from "react";
import {
  Box,
  Typography,
  Chip,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
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
          >
            <Box sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" mb={2}>
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
              <Typography variant="body2" sx={{ pl: 4 }}>
                Monto total: ${order.totalAmount}
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
                    deliveryMethodId={order.deliveryMethodId.toString()}
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
                  <ListItem key={item.id}>
                    <ListItemText
                      primary={`ID del Producto: ${item.productId || "N/A"} ${
                        item.productComboId
                          ? `(Combo ID: ${item.productComboId})`
                          : ""
                      }`}
                      secondary={`Cantidad: ${item.amount}`}
                    />
                  </ListItem>
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
