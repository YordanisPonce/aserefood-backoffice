"use client";
import React from "react";
import useContactInfos from "../hooks/useContactInfos";
import { Box, CircularProgress } from "@mui/material";
import { ContactInfo } from "@/lib/types/contactInfo";
import CardList from "@/components/partials/CardList/CardList";
import ContactInfoCard from "./ContactInfoCard";
import useContactInfosFilters from "./contact-info-filters/hooks/useContactInfosFilters";
import ModalFetchingDataError from "@/components/partials/Modal/components/ModalFetchingDataError";
import DetailsSectionHeader from "@/components/partials/DetailsSectionsHeader/DetailsSectionHeader";
import ContactInfosFiltersComponent from "./contact-info-filters/ContactInfoFilters";

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
        filters={
          <ContactInfosFiltersComponent
            filters={filters}
            handleChangeFilters={handleFilterChange}
            handleReset={handleReset}
          />
        }
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
