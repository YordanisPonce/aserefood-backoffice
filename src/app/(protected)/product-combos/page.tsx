import { SearchParams } from "@/lib/types/pagination";
import { Paper } from "@mui/material";
import React from "react";
import SectionHeader from "@/components/partials/SectionHeader/SectionHeader";
import Modal from "@/components/partials/Modal/Modal";
import { modalTypes } from "@/components/partials/Modal/types/modalTypes";
import { getProductCombos } from "@/lib/services/productCombos";
import { ProductCombosList } from "@/sections/product-combos/components/ProductCombosList";
import { ProductComboFormContainer } from "@/sections/product-combos/containers/ProductComboFormContainer";
import ProductComboDetailsContainer from "@/sections/product-combos/containers/ProductComboDetailsContainer";

type ProductCombosPageProps = {
  searchParams: SearchParams;
};
export default async function ProductCombosPage({
  searchParams,
}: ProductCombosPageProps) {
  const { data, page, total, pageSize } = await getProductCombos(searchParams);

  return (
    <Paper sx={{ p: 2 }}>
      <SectionHeader
        titleSection="Combos de Productos"
        titleButton="Crear Combo"
        createAction={modalTypes.productCombos.form.name}
      />
      <ProductCombosList
        pagination={{ page, total, pageSize }}
        productCombos={data}
      />
      <Modal
        formPath={modalTypes.productCombos.form.name}
        titleModal={modalTypes.productCombos.form.title}
      >
        <ProductComboFormContainer />
      </Modal>
      <Modal
        formPath={modalTypes.productCombos.details.name}
        titleModal={modalTypes.productCombos.details.title}
      >
        <ProductComboDetailsContainer />
      </Modal>
    </Paper>
  );
}

export const dynamic = "force-dynamic";
