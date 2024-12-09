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
import { CalendarToday, LocalOffer, Description } from "@mui/icons-material";
import useModal from "@/components/partials/Modal/hooks/useModal";
import LoadingScreen from "@/components/common/loading/LoadingScreen";
import ModalFetchingDataError from "@/components/partials/Modal/components/ModalFetchingDataError";
import usePromotion from "../hooks/usePromotion";

export default function PromotionDetailsContainer() {
  const { entityId } = useModal();
  const { promotion, loadingData, error, fetchPromotion } = usePromotion({
    promotionId: entityId,
  });

  return (
    <>
      {!loadingData ? (
        promotion && !error ? (
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
                image={
                  promotion.image ? promotion.image : "images/place-holder.png"
                }
                alt={`Product image ${
                  promotion.image ? promotion.image : "images/place-holder.png"
                }`}
                sx={{
                  objectFit: "cover",
                  cursor: "pointer",
                }}
              />
            </Card>
            <Box sx={{ p: 3, overflowY: "auto" }}>
              <Typography
                id="promotion-details-modal"
                variant="h6"
                component="h2"
                gutterBottom
              >
                {promotion.name}
              </Typography>
              <Chip
                label={promotion.isActive ? "Activa" : "Inactiva"}
                color={promotion.isActive ? "success" : "error"}
                size="small"
                sx={{ mb: 2 }}
              />
              <Typography variant="body2" color="text.secondary">
                Código: {promotion.code}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box display="flex" alignItems="center" mb={2}>
                <CalendarToday sx={{ mr: 1 }} color="action" />
                <Typography variant="body2">
                  Vigencia: {new Date(promotion.startDate).toLocaleDateString()}{" "}
                  - {new Date(promotion.endDate).toLocaleDateString()}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={2}>
                <LocalOffer sx={{ mr: 1 }} color="action" />
                <Typography variant="body2">
                  Descuento: {promotion.discountValue}
                  {promotion.discountOption === 1 ? "%" : " USD"}
                </Typography>
              </Box>
              <Typography variant="body2">
                <Description
                  sx={{ mr: 1, verticalAlign: "middle" }}
                  color="action"
                />
                Descripción:
              </Typography>
              <Typography variant="body2" sx={{ pl: 4 }}>
                {promotion.description}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                Combos de productos:
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
                {promotion.productCombos.map((combo) => (
                  <ListItem key={combo.id}>
                    <ListItemText primary={combo.name} />
                  </ListItem>
                ))}
              </List>
              <Typography variant="subtitle2" gutterBottom>
                Productos:
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
                {promotion.products.map((product) => (
                  <ListItem key={product.id}>
                    <ListItemText primary={product.name} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        ) : (
          <ModalFetchingDataError
            message={error as string}
            reset={fetchPromotion}
          />
        )
      ) : (
        <LoadingScreen sx={{ height: "100%" }} />
      )}
    </>
  );
}
