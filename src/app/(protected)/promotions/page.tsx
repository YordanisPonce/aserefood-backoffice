import { SearchParams } from "@/lib/types/pagination";
import { Paper } from "@mui/material";
import React from "react";
import SectionHeader from "@/components/partials/SectionHeader/SectionHeader";
import Modal from "@/components/partials/Modal/Modal";
import { modalTypes } from "@/components/partials/Modal/types/modalTypes";
import { PromotionsList } from "@/sections/promotions/components/PromotionsList";
import { getPromotions } from "@/lib/services/promotions";
import { PromotionFormContainer } from "@/sections/promotions/containers/PromotionFormContainer";
import PromotionDetailsContainer from "@/sections/promotions/containers/PromotionDetailsContainer";

type PromotionsPageProps = {
  searchParams: SearchParams;
};
export default async function PromotionsPage({
  searchParams,
}: PromotionsPageProps) {
  const { data, page, total, pageSize } = await getPromotions(searchParams);

  return (
    <Paper sx={{ p: 2 }}>
      <SectionHeader
        titleSection="Promociones"
        titleButton="Crear Promoción"
        createAction="form-promotion"
      />
      <PromotionsList
        pagination={{ page, total, pageSize }}
        promotions={data}
      />
      <Modal formPath={"form-promotion"} titleModal={"Formulario de Promoción"}>
        <PromotionFormContainer />
      </Modal>
      <Modal
        formPath={"details-promotion"}
        titleModal={"Información de Promoción"}
      >
        <PromotionDetailsContainer />
      </Modal>
    </Paper>
  );
}

export const dynamic = "force-dynamic";
