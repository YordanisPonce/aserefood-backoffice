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
import { Category, Description } from "@mui/icons-material";
import useModal from "@/components/partials/Modal/hooks/useModal";
import useProduct from "../../hooks/useProduct";
import LoadingScreen from "@/components/common/loading/LoadingScreen";
import ModalFetchingDataError from "@/components/partials/Modal/components/ModalFetchingDataError";
import ImagesGrid from "./components/ImagesGrid";

const productImages = [
  "/images/product-place-holder.png",
  "/images/product-place-holder.png",
  "/images/product-place-holder.png",
  "/images/product-place-holder.png",
  "/images/product-place-holder.png",
  "/images/product-place-holder.png",
];

export default function DetailsProductContainer() {
  const { entityId } = useModal();
  const { product, loadingData, error, fetchProduct } = useProduct({
    productId: entityId,
  });

  return (
    <>
      {!loadingData ? (
        product && !error ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              maxHeight: "90vh",
              overflow: "hidden",
            }}
          >
            <Box sx={{ p: 3, overflowY: "auto" }}>
              <Typography
                id="product-details-modal"
                variant="h6"
                component="h2"
                gutterBottom
              >
                {product.name}
              </Typography>
              <Chip
                label={
                  product.isService
                    ? "Disponible Servicio"
                    : "No dispone de Servicio"
                }
                color={product.isService ? "primary" : "error"}
                size="small"
                sx={{ mb: 2 }}
              />
              <Typography variant="body2" color="text.secondary" paragraph>
                {product.shortDescription}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box display="flex" alignItems="center" mb={2}>
                <Category sx={{ mr: 1 }} color="action" />
                <Typography variant="body2">
                  Category: {product.categoryName}
                </Typography>
              </Box>
              <Typography variant="body2" paragraph>
                <Description
                  sx={{ mr: 1, verticalAlign: "middle" }}
                  color="action"
                />
                Description:
              </Typography>
              <Typography variant="body2" paragraph sx={{ pl: 4 }}>
                {product.description}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                Proveedores:
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
                {product.providers.map((provider) => (
                  <ListItem key={provider.id}>
                    <ListItemText primary={provider.name} />
                  </ListItem>
                ))}
              </List>
              <ImagesGrid images={productImages} />
            </Box>
          </Box>
        ) : (
          <ModalFetchingDataError
            message={error as string}
            reset={fetchProduct}
          />
        )
      ) : (
        <LoadingScreen sx={{ height: "100%" }} />
      )}
    </>
  );
}
