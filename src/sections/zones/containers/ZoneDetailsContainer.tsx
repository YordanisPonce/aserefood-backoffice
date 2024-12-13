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
import { LocationCity, Description, Public } from "@mui/icons-material";
import useModal from "@/components/partials/Modal/hooks/useModal";
import LoadingScreen from "@/components/common/loading/LoadingScreen";
import ModalFetchingDataError from "@/components/partials/Modal/components/ModalFetchingDataError";
import useZone from "../hooks/useZone";

export interface ZoneDetails {
  name: string;
  description: string;
  municipalities: {
    name: string;
  }[];
}

export default function ZoneDetailsContainer() {
  const { entityId } = useModal();
  const { zone, loadingData, error, fetchZone } = useZone({
    zoneId: entityId,
  });

  return (
    <>
      {!loadingData ? (
        zone && !error ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              maxHeight: "90vh",
              overflow: "hidden",
            }}
          >
            <Box sx={{ p: 3, overflowY: "auto" }}>
              <Box display="flex" alignItems="center" mb={2}>
                <Public sx={{ fontSize: 40, mr: 2, color: "primary.main" }} />
                <Typography
                  id="zone-details-modal"
                  variant="h6"
                  component="h2"
                  gutterBottom
                >
                  {zone.name}
                </Typography>
              </Box>

              <Chip
                label={`${zone.municipalities.length} Municipios`}
                color="primary"
                size="small"
                sx={{ mb: 2 }}
              />
              <Typography variant="body2" color="text.secondary">
                {zone.description}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box display="flex" alignItems="center" mb={2}>
                <LocationCity sx={{ mr: 1 }} color="action" />
                <Typography variant="body2">
                  Municipios en esta zona:
                </Typography>
              </Box>
              <List
                dense
                sx={{
                  maxHeight: 150,
                  overflowY: "auto",
                  bgcolor: "background.paper",
                  mb: 2,
                }}
              >
                {zone.municipalities.map((municipality, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={municipality.name} />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2">
                <Description
                  sx={{ mr: 1, verticalAlign: "middle" }}
                  color="action"
                />
                Descripción detallada:
              </Typography>
              <Typography variant="body2" sx={{ pl: 4 }}>
                {zone.description}
              </Typography>
            </Box>
          </Box>
        ) : (
          <ModalFetchingDataError message={error as string} reset={fetchZone} />
        )
      ) : (
        <LoadingScreen sx={{ height: "100%" }} />
      )}
    </>
  );
}
