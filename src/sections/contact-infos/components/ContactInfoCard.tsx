import React from "react";
import { ContactInfo } from "@/lib/types/contactInfo";
import { Badge, Home, LocationCity, Phone } from "@mui/icons-material";
import { Avatar, Box, Card, Tooltip, Typography, Divider } from "@mui/material";

interface Props {
  data: ContactInfo;
}

export default function ContactInfoCard({ data: contactInfo }: Props) {
  return (
    <Card elevation={1} sx={{ mb: 2, borderRadius: 2, overflow: "visible" }}>
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
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" gutterBottom>
            {contactInfo.name}
          </Typography>
          <Box display={"flex"} flexWrap={"wrap"} gap={2}>
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
          </Box>
        </Box>
      </Box>
      {contactInfo.observations && (
        <>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Observaciones
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {contactInfo.observations}
            </Typography>
          </Box>
        </>
      )}
    </Card>
  );
}

interface InfoItemProps {
  icon: React.ReactElement;
  label: string;
  value: string;
}

function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <Tooltip title={label}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {React.cloneElement(icon, {
          fontSize: "small",
          color: "action",
        })}
        <Typography variant="body2" color="text.secondary" noWrap>
          {value}
        </Typography>
      </Box>
    </Tooltip>
  );
}
