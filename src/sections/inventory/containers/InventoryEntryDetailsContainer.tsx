"use client";

import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Inventory,
  LocalOffer,
  Room,
  AttachMoney,
  ShoppingCart,
} from "@mui/icons-material";
import useModal from "@/components/partials/Modal/hooks/useModal";
import LoadingScreen from "@/components/common/loading/LoadingScreen";
import ModalFetchingDataError from "@/components/partials/Modal/components/ModalFetchingDataError";
import useInventoryEntry from "../hooks/useInventoryEntry";

export default function InventoryEntryDetailsContainer() {
  const { entityId } = useModal();
  const { inventoryEntry, loadingData, error, fetchInventoryEntry } =
    useInventoryEntry({
      inventoryEntryId: entityId,
    });

  return (
    <>
      {!loadingData ? (
        inventoryEntry && !error ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              maxHeight: "90vh",
              overflow: "hidden",
            }}
          >
            <Box sx={{ p: 3, overflowY: "auto" }}>
              <Box display="flex" alignItems="center">
                <Inventory
                  sx={{ fontSize: 40, mr: 2, color: "primary.main" }}
                />
                <Typography
                  id="inventory-entry-details-modal"
                  variant="h6"
                  component="h2"
                  gutterBottom
                >
                  Entrada de Inventario: {inventoryEntry.id}
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <List dense>
                <ListItem>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" mb={1}>
                        <ShoppingCart sx={{ mr: 1 }} color="action" />
                        <Typography variant="body2">Producto</Typography>
                      </Box>
                    }
                    secondary={inventoryEntry.productName}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" mb={1}>
                        <Room sx={{ mr: 1 }} color="action" />
                        <Typography variant="body2">Zona</Typography>
                      </Box>
                    }
                    secondary={`${inventoryEntry.zoneName}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" mb={1}>
                        <AttachMoney sx={{ mr: 1 }} color="action" />
                        <Typography variant="body2">Precio</Typography>
                      </Box>
                    }
                    secondary={`$${inventoryEntry.price.toFixed(2)}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" mb={1}>
                        <LocalOffer sx={{ mr: 1 }} color="action" />
                        <Typography variant="body2">Cantidad</Typography>
                      </Box>
                    }
                    secondary={inventoryEntry.quantity}
                  />
                </ListItem>
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="text.secondary">
                Valor Total: $
                {(inventoryEntry.price * inventoryEntry.quantity).toFixed(2)}
              </Typography>
            </Box>
          </Box>
        ) : (
          <ModalFetchingDataError
            message={error as string}
            reset={fetchInventoryEntry}
          />
        )
      ) : (
        <LoadingScreen sx={{ height: "100%" }} />
      )}
    </>
  );
}
