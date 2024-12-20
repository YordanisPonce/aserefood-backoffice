"use client";
import { useState } from "react";
import { deleteProduct } from "@/lib/services/products";
import { deleteProductCombo } from "@/lib/services/productCombos";
import { deleteProvider } from "@/lib/services/providers";
import { deleteProvince } from "@/lib/services/provinces";
import { deleteMunicipality } from "@/lib/services/municipalities";
import { deleteInventoryEntry } from "@/lib/services/inventory";
import { deleteZone } from "@/lib/services/zones";
import { deleteUser } from "@/lib/services/user";
import { deleteCategory } from "@/lib/services/categories";
import { modalTypes } from "@/components/partials/Modal/types/modalTypes";
import { deletePromotion } from "../services/promotions";
import { deleteDeliveryMethod } from "../services/deliveryMethods";

interface Props {
  currentModal: string | null;
  entityId: string | null;
  handleCloseModal: () => void;
}

export default function useDeleteEntity({
  currentModal,
  entityId,
  handleCloseModal,
}: Props) {
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  async function deleteAction() {
    if (entityId) {
      setIsLoading(true);
      setError(undefined);
      try {
        switch (currentModal) {
          case modalTypes.products.delete.name:
            await deleteProduct(entityId);
            break;
          case modalTypes.productCombos.delete.name:
            await deleteProductCombo(entityId);
            break;
          case modalTypes.providers.delete.name:
            await deleteProvider(entityId);
            break;
          case modalTypes.provinces.delete.name:
            await deleteProvince(entityId);
            break;
          case modalTypes.municipalities.delete.name:
            await deleteMunicipality(entityId);
            break;
          case modalTypes.inventory.delete.name:
            await deleteInventoryEntry(entityId);
            break;
          case modalTypes.zones.delete.name:
            await deleteZone(entityId);
            break;
          case modalTypes.users.delete.name:
            await deleteUser(entityId);
            break;
          case modalTypes.categories.delete.name:
            await deleteCategory(entityId);
            break;
          case modalTypes.promotions.delete.name:
            await deletePromotion(entityId);
            break;
          case modalTypes.deliveryMethods.delete.name:
            await deleteDeliveryMethod(entityId);
            break;
          default:
            break;
        }
        handleCloseModal();
      } catch (error) {
        console.log(error);
        if (error instanceof Error) setError(error.message);
      } finally {
        setIsLoading(false);
      }
    } else
      throw Error("No fue proporcionado un identificador para la eliminación");
  }

  return { deleteAction, isLoading, error };
}
