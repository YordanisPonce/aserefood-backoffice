"use client";
import React, { ReactNode } from "react";
import DialogSections from "@/sections/components/DialogSections";
import UserDetails from "@/sections/users/components/UserDetails";
import { Badge, Home, LocationCity, Phone, Person } from "@mui/icons-material";
import { Avatar, Box, Tooltip, Typography, Divider } from "@mui/material";
import { ContactInfo, ContactInfoDetails } from "@/lib/types/contactInfo";
import Grid from "@mui/material/Grid2";
interface Props {
  contactInfo: ContactInfo | ContactInfoDetails;
  isShowDetailsUser?: boolean;
}

export default function ContactInfoDetailsContent({
  contactInfo,
  isShowDetailsUser = false,
}: Props) {
  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Box sx={{ p: 2, display: "flex", alignItems: "flex-start" }}>
        <Avatar
          sx={{
            bgcolor: "primary.main",
            color: "white",
            width: 48,
            height: 48,
            mr: 2,
          }}
        >
          {contactInfo.name[0]}
        </Avatar>
        <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
          <Typography variant="h6" gutterBottom noWrap>
            {contactInfo.name}
          </Typography>
          <Grid container spacing={1}>
            <InfoItem
              icon={<Phone />}
              label="Teléfono"
              value={contactInfo.phoneNumber}
            />
            <InfoItem
              icon={<Home />}
              label="Dirección"
              value={contactInfo.address}
            />
            <InfoItem
              icon={<LocationCity />}
              label="Municipio"
              value={contactInfo.municipality.name}
            />
            <InfoItem
              icon={<Badge />}
              label="Número de Identificación"
              value={contactInfo.identificationNumber}
            />
            {"userId" in contactInfo && isShowDetailsUser && (
              <InfoItem
                icon={<Person />}
                label="Usuario"
                value={
                  <DialogSections
                    title="Información del usuario"
                    buttonTitle="Ver Información del Usuario"
                  >
                    <UserDetails userId={contactInfo.userId.toString()} />
                  </DialogSections>
                }
              />
            )}
          </Grid>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Typography variant="subtitle2" gutterBottom>
          Observaciones
        </Typography>
        <Box sx={{ flexGrow: 1, overflow: "auto" }}>
          {contactInfo.observations ? (
            <Typography variant="body2" color="text.secondary">
              {contactInfo.observations}
            </Typography>
          ) : (
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
            >
              No tiene observaciones
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}

interface InfoItemProps {
  icon: React.ReactElement;
  label: string;
  value: ReactNode;
}

function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <Grid size={{ xs: 6 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Tooltip title={label}>
          {React.cloneElement(icon, {
            fontSize: "small",
            color: "action",
          })}
        </Tooltip>
        <Typography variant="body2" color="text.secondary" noWrap>
          {value}
        </Typography>
      </Box>
    </Grid>
  );
}
