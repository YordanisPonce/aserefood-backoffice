"use client";

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
import {
  Description,
  ShoppingBasket,
  AttachMoney,
  Place,
} from "@mui/icons-material";
import useModal from "@/components/partials/Modal/hooks/useModal";
import LoadingScreen from "@/components/common/loading/LoadingScreen";
import ModalFetchingDataError from "@/components/partials/Modal/components/ModalFetchingDataError";
import useProductCombo from "../hooks/useProductCombo";
import PreviewImage from "@/components/partials/PreviewImage/PreviewImage";

export default function ProductComboDetailsContainer() {
  const { entityId } = useModal();
  const { productCombo, loadingData, error, fetchProductCombo } =
    useProductCombo({
      productComboId: entityId,
    });

  return (
    <>
      {!loadingData ? (
        productCombo && !error ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              maxHeight: "90vh",
              overflow: "hidden",
            }}
          >
            <Box display={"flex"} justifyContent={"center"}>
              <PreviewImage
                preview={
                  productCombo.image
                    ? productCombo.image
                    : "images/place-holder.png"
                }
              />
            </Box>
            <Box sx={{ p: 3, overflowY: "auto" }}>
              <Box display="flex" alignItems="center" mb={2}>
                <ShoppingBasket
                  sx={{ fontSize: 40, mr: 2, color: "primary.main" }}
                />
                <Typography
                  id="product-combo-details-modal"
                  variant="h6"
                  component="h2"
                  gutterBottom
                >
                  {productCombo.name}
                </Typography>
              </Box>
              <Chip
                label={productCombo.isActive ? "Activo" : "Inactivo"}
                color={productCombo.isActive ? "success" : "error"}
                size="small"
                sx={{ mb: 2 }}
              />
              <Typography variant="body2" color="text.secondary" paragraph>
                {productCombo.shortDescription}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box display="flex" alignItems="center" mb={2}>
                <Place sx={{ mr: 1 }} color="action" />
                <Typography variant="body2">
                  Zona: {productCombo.zoneName}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={2}>
                <AttachMoney sx={{ mr: 1 }} color="action" />
                <Typography variant="body2">
                  Precio: ${productCombo.price.toFixed(2)} (Referencia: $
                  {productCombo.referencePrice.toFixed(2)})
                </Typography>
              </Box>
              <Typography variant="body2" paragraph>
                <Description
                  sx={{ mr: 1, verticalAlign: "middle" }}
                  color="action"
                />
                Descripción:
              </Typography>
              <Typography variant="body2" paragraph sx={{ pl: 4 }}>
                {productCombo.description}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                Productos en el combo:
              </Typography>
              <List
                dense
                sx={{
                  maxHeight: 150,
                  overflowY: "auto",
                  bgcolor: "background.paper",
                  mb: 2,
                }}
              >
                {productCombo.productComboItems.map((item) => (
                  <ListItem key={item.id}>
                    <ListItemText
                      primary={item.productName}
                      secondary={`Cantidad: ${item.amount}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        ) : (
          <ModalFetchingDataError
            message={error as string}
            reset={fetchProductCombo}
          />
        )
      ) : (
        <LoadingScreen sx={{ height: "100%" }} />
      )}
    </>
  );
}
