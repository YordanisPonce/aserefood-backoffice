"use client";
import React from "react";
import useContactInfos from "../hooks/useContactInfos";
import { Box, CircularProgress } from "@mui/material";
import { ContactInfo } from "@/lib/types/contactInfo";
import CardList from "@/components/partials/CardList/CardList";
import ContactInfoCard from "./ContactInfoCard";
import useContactInfosFilters from "./contact-info-filters/hooks/useContactInfosFilters";
import ContactInfosFilters from "./contact-info-filters/ContactInfosFilters";
import ModalFetchingDataError from "@/components/partials/Modal/components/ModalFetchingDataError";
import DetailsSectionHeader from "@/components/partials/DetailsSectionsHeader/DetailsSectionHeader";

interface Props {
  userId: string | null;
}

export default function ContactInfosList({ userId }: Props) {
  const { filters, handleFilterChange, handleReset } = useContactInfosFilters();
  const {
    contactInfos,
    error,
    loadingData,
    fetchContactInfos,
    pagination,
    clientHandleChangePage,
    clientHandlePageSizeChange,
  } = useContactInfos({ userId, filters });

  return (
    <>
      <DetailsSectionHeader
        title="Información de Contactos"
        filters={{
          handleReset: handleReset,
          component: (
            <ContactInfosFilters
              filters={filters}
              handleFilterChange={handleFilterChange}
            />
          ),
        }}
      />
      {!loadingData ? (
        !error ? (
          <CardList<ContactInfo>
            notInfoAvailableTitle="No hay información de contacto disponible."
            maxHeight={600}
            items={contactInfos}
            CardComponent={ContactInfoCard}
            pagination={{
              pagination: pagination,
              clientHandleChangePage,
              clientHandlePageSizeChange,
            }}
          />
        ) : (
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            mt={2}
          >
            <ModalFetchingDataError
              message="Hubo un error a la hora de cargar los datos"
              reset={fetchContactInfos}
            />
          </Box>
        )
      ) : (
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          mt={2}
        >
          <CircularProgress size={50} />
        </Box>
      )}
    </>
  );
}
