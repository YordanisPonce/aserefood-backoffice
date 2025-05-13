"use client";

import useContactInfo from "@/sections/contact-infos/hooks/useContactInfo";
import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import React from "react";
import { Person } from "@mui/icons-material";
import ContactInfoDetailsContent from "@/sections/contact-infos/components/ContactInfoDetailsContent";
import ModalFetchingDataError from "@/components/partials/Modal/components/ModalFetchingDataError";
interface Props {
  contactInfoId: string;
}

export default function OrderDetailsContactInfoSection({
  contactInfoId,
}: Props) {
  const { contactInfo, error, loadingData, fetchContactInfo } = useContactInfo({
    contactInfoId,
  });
  return (
    <Box sx={{ padding: 1, display: "flex", flexDirection: "column", gap: 1 }}>
      <Box display="flex" alignItems="center" mb={1} gap={1}>
        <Person sx={{ mr: 1 }} color="action" />
        <Typography variant="subtitle2">Información de Contacto:</Typography>
      </Box>
      {!loadingData ? (
        contactInfo && !error ? (
         <Paper elevation={2} sx={{borderRadius: 2}}>
             <ContactInfoDetailsContent
            contactInfo={contactInfo}
            isShowDetailsUser={false}
          />
         </Paper>
        ) : (
          <ModalFetchingDataError
            message={error as string}
            reset={fetchContactInfo}
          />
        )
      ) : (
        <Box padding={2} display={"flex"} justifyContent={"center"}>
          <CircularProgress size={50} />
        </Box>
      )}
    </Box>
  );
}
