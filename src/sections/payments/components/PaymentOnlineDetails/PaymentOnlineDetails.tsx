"use client";
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
  useTheme,
  useMediaQuery,
  Box,
  Tooltip,
  IconButton,
} from "@mui/material";
import { PaymentOnline } from "@/lib/types/paymentOnline";
import {
  CreditCard,
  ShoppingCart,
  Key,
  Person,
  Email,
  Phone,
  Home,
  LocationCity,
  Place,
  Public,
  MarkAsUnread,
} from "@mui/icons-material";

interface Props {
  paymentOnline: PaymentOnline;
}

export default function PaymentOnlineDetails({ paymentOnline }: Props) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const InfoItem = ({
    label,
    value,
    icon,
  }: {
    label: string;
    value: string;
    icon: React.ReactNode;
  }) => (
    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
      <Tooltip title={label}>
        <IconButton size="small" sx={{ mr: 1 }}>
          {icon}
        </IconButton>
      </Tooltip>
      <Box>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: "medium" }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: "100%",
        mb: 2,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Stack
          direction={isSmallScreen ? "column" : "row"}
          spacing={3}
          divider={
            <Divider
              orientation={isSmallScreen ? "horizontal" : "vertical"}
              flexItem
            />
          }
        >
          <Box flex={1}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Información de Pago
            </Typography>
            <Stack spacing={2} sx={{ mb: 2 }}>
              <InfoItem
                icon={<CreditCard />}
                label="ID"
                value={paymentOnline.id.toString()}
              />
              <InfoItem
                icon={<ShoppingCart />}
                label="Orden ID"
                value={paymentOnline.orderId.toString()}
              />
              <InfoItem
                icon={<Key />}
                label="Código de Pago"
                value={paymentOnline.paymentCode}
              />
            </Stack>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                mt: 3,
                fontWeight: "bold",
              }}
            >
              Información Personal
            </Typography>
            <Stack spacing={2} sx={{ mb: 1 }}>
              <InfoItem
                icon={<Person />}
                label="Nombre"
                value={`${paymentOnline.firstName} ${paymentOnline.lastName}`}
              />
              <InfoItem
                icon={<Email />}
                label="Email"
                value={paymentOnline.email}
              />
              <InfoItem
                icon={<Phone />}
                label="Teléfono"
                value={paymentOnline.phoneNumber}
              />
            </Stack>
          </Box>
          <Box flex={1}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Dirección de Envío
            </Typography>
            <Stack spacing={2}>
              <InfoItem
                icon={<Home />}
                label="Dirección 1"
                value={paymentOnline.address1}
              />
              {paymentOnline.address2 && (
                <InfoItem
                  icon={<Home />}
                  label="Dirección 2"
                  value={paymentOnline.address2}
                />
              )}
              <InfoItem
                icon={<Place />}
                label="País"
                value={paymentOnline.country}
              />
              <InfoItem
                icon={<LocationCity />}
                label="Ciudad"
                value={`${paymentOnline.city}`}
              />
              <InfoItem
                icon={<Public />}
                label="Estado"
                value={`${paymentOnline.state}`}
              />
              <InfoItem
                icon={<MarkAsUnread />}
                label="Código Postal"
                value={`${paymentOnline.postalCode}`}
              />
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
