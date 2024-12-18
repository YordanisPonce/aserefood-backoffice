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
  Avatar,
} from "@mui/material";
import { Email, Phone, VpnKey } from "@mui/icons-material";
import useModal from "@/components/partials/Modal/hooks/useModal";
import LoadingScreen from "@/components/common/loading/LoadingScreen";
import ModalFetchingDataError from "@/components/partials/Modal/components/ModalFetchingDataError";
import useUser from "../hooks/useUser";
import ContactInfosList from "@/sections/contact-infos/components/ContactInfosList";

export default function UserDetailsContainer() {
  const { entityId } = useModal();
  const { user, loadingData, error, fetchUser } = useUser({
    userId: entityId,
  });

  return (
    <>
      {!loadingData ? (
        user && !error ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ p: 3, overflowY: "auto" }}>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar sx={{ width: 60, height: 60, fontSize: 30, mr: 2 }}>
                  {user.name.charAt(0)}
                </Avatar>
                <Box>
                  <Typography
                    id="user-details-modal"
                    variant="h6"
                    component="h2"
                    gutterBottom
                  >
                    {user.name} {user.lastnames}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    @{user.username}
                  </Typography>
                </Box>
              </Box>
              <Chip
                label={user.isActive ? "Activo" : "Inactivo"}
                color={user.isActive ? "success" : "error"}
                size="small"
                sx={{ mb: 2, mr: 1 }}
              />
              <Chip
                label={user.isConfirmed ? "Confirmado" : "No confirmado"}
                color={user.isConfirmed ? "success" : "error"}
                size="small"
                sx={{ mb: 2 }}
              />
              <Divider sx={{ my: 2 }} />
              <List dense>
                <ListItem>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center">
                        <Email sx={{ mr: 1 }} color="action" />
                        <Typography variant="body2">Email</Typography>
                      </Box>
                    }
                    secondary={user.email}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center">
                        <Phone sx={{ mr: 1 }} color="action" />
                        <Typography variant="body2">Teléfono</Typography>
                      </Box>
                    }
                    secondary={user.phoneNumber}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center">
                        <VpnKey sx={{ mr: 1 }} color="action" />
                        <Typography variant="body2">Rol</Typography>
                      </Box>
                    }
                    secondary={user.role}
                  />
                </ListItem>
              </List>
              <Divider sx={{ my: 2 }} />
              <ContactInfosList userId={entityId} />
            </Box>
          </Box>
        ) : (
          <ModalFetchingDataError message={error as string} reset={fetchUser} />
        )
      ) : (
        <LoadingScreen sx={{ height: "100%" }} />
      )}
    </>
  );
}
