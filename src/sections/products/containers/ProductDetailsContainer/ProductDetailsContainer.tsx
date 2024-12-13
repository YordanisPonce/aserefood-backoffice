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
  Card,
  CardMedia,
} from "@mui/material";
import { Description, ShoppingCart } from "@mui/icons-material";
import useModal from "@/components/partials/Modal/hooks/useModal";
import useProduct from "../../hooks/useProduct";
import LoadingScreen from "@/components/common/loading/LoadingScreen";
import ModalFetchingDataError from "@/components/partials/Modal/components/ModalFetchingDataError";
import ProductCategoriesSection from "./components/ProductCategoriesSection";

export default function ProductDetailsContainer() {
  const { entityId } = useModal();
  const {
    product,
    loadingData: loadingDataProduct,
    error: errorProduct,
    fetchProduct,
  } = useProduct({
    productId: entityId,
  });

  return (
    <>
      {!loadingDataProduct ? (
        product && !errorProduct ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              maxHeight: "90vh",
              overflow: "hidden",
            }}
          >
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={product.image || "/images/product-place-holder.png"}
                alt={`Product image ${
                  product.image || "/images/product-place-holder.png"
                }`}
                sx={{
                  objectFit: "cover",
                  cursor: "pointer",
                }}
              />
            </Card>
            <Box sx={{ p: 3, overflowY: "auto" }}>
              <Box display="flex" alignItems="center" mb={2}>
                <ShoppingCart
                  sx={{ fontSize: 40, mr: 2, color: "primary.main" }}
                />
                <Typography
                  id="product-details-modal"
                  variant="h6"
                  component="h2"
                  gutterBottom
                >
                  {product.name}
                </Typography>
              </Box>
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
              <Typography variant="body2" color="text.secondary">
                {product.shortDescription}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <ProductCategoriesSection
                categoryId={product.categoryId.toString()}
              />
              <Typography variant="body2">
                <Description
                  sx={{ mr: 1, verticalAlign: "middle" }}
                  color="action"
                />
                Description:
              </Typography>
              <Typography variant="body2" sx={{ pl: 4 }}>
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
            </Box>
          </Box>
        ) : (
          <ModalFetchingDataError
            message={errorProduct as string}
            reset={fetchProduct}
          />
        )
      ) : (
        <LoadingScreen sx={{ height: "100%" }} />
      )}
    </>
  );
}
