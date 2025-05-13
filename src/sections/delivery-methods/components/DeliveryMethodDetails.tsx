"use client";
import React from "react";
import {
  Box,
  Typography,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { LocalShipping, LocationOn, AttachMoney } from "@mui/icons-material";
import LoadingScreen from "@/components/common/loading/LoadingScreen";
import ModalFetchingDataError from "@/components/partials/Modal/components/ModalFetchingDataError";
import { DeliveryMethodDetails as DeliveryMethodDetailsType } from "@/lib/types/deliveryMethod";

interface Props {
  deliveryMethodData: {
    deliveryMethod: DeliveryMethodDetailsType | undefined;
    loadingData: boolean;
    error: string | undefined;
    fetchDeliveryMethod: () => Promise<void>;
  };
}

export default function DeliveryMethodDetails({
  deliveryMethodData: {
    deliveryMethod,
    loadingData,
    error,
    fetchDeliveryMethod,
  },
}: Props) {
  return (
    <>
      {!loadingData ? (
        deliveryMethod && !error ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              maxHeight: "90vh",
              overflow: "hidden",
              width: "100%",
            }}
          >
            <Box sx={{ p: 3, overflowY: "auto" }}>
              <Typography
                id="delivery-method-details-modal"
                variant="h6"
                component="h2"
                gutterBottom
              >
                {deliveryMethod.name}
              </Typography>
              <Chip
                label={
                  deliveryMethod.isFree ? "Entrega Gratis" : "Entrega de Pago"
                }
                color={deliveryMethod.isFree ? "success" : "error"}
                size="small"
                sx={{ mb: 2 }}
              />
              <Typography variant="body2" color="text.secondary">
                Tiempo estimado de llegada:{" "}
                {deliveryMethod.estimatedArrivalTime}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box display="flex" alignItems="center" mb={2}>
                <LocalShipping sx={{ mr: 1 }} color="action" />
                <Typography variant="body2">
                  Costo de entrega: ${deliveryMethod.cost.toFixed(2)}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={2}>
                <AttachMoney sx={{ mr: 1 }} color="action" />
                <Typography variant="body2">
                  Precio mínimo de entrega: $
                  {deliveryMethod.minimalDeliveryPrice.toFixed(2)}
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                Ubicación de recogida:
              </Typography>
              <Typography variant="body2" paragraph sx={{ pl: 4 }}>
                <LocationOn
                  sx={{ mr: 1, verticalAlign: "middle" }}
                  color="action"
                />
                {deliveryMethod.pickUpDirection}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                Municipio:
              </Typography>
              <List dense sx={{ bgcolor: "background.paper", mb: 2 }}>
                <ListItem>
                  <ListItemText
                    primary={deliveryMethod.municipality.name}
                    secondary={`Provincia: ${deliveryMethod.municipality.provinceName}`}
                  />
                </ListItem>
              </List>
            </Box>
          </Box>
        ) : (
          <ModalFetchingDataError
            message={error as string}
            reset={fetchDeliveryMethod}
          />
        )
      ) : (
        <LoadingScreen sx={{ height: "100%" }} />
      )}
    </>
  );
}
