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
import useSnackBar from "@/components/partials/SnackBar/hooks/useSnackBar";
import { ApiError, UnauthorizedClientError } from "../types/errors";
import { signOut } from "next-auth/react";
import { routes } from "../config/routes";
import useAlertDialog from "@/components/partials/AlertDialog/hooks/useAlertDialog";
import { errorClientHandling } from "../utils/errorClientHandling";

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
  const { openSnackBar } = useSnackBar();
  const { openAlertDialog } = useAlertDialog();
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  async function deleteAction() {
    if (entityId) {
      setIsLoading(true);
      setError(undefined);
      try {
        let response: ApiError;
        switch (currentModal) {
          case modalTypes.products.delete.name:
            response = await deleteProduct(entityId);
            errorClientHandling(response);
            openSnackBar(
              `El Producto con identificador ${entityId} ha sido eliminado con éxito`,
              "success"
            );
            break;
          case modalTypes.productCombos.delete.name:
            response = await deleteProductCombo(entityId);
            errorClientHandling(response);
            openSnackBar(
              `El Combo de producto con identificador ${entityId} ha sido eliminado con éxito`,
              "success"
            );
            break;
          case modalTypes.providers.delete.name:
            response = await deleteProvider(entityId);
            errorClientHandling(response);
            openSnackBar(
              `El Proveedor con identificador ${entityId} ha sido eliminado con éxito`,
              "success"
            );
            break;
          case modalTypes.provinces.delete.name:
            response = await deleteProvince(entityId);
            errorClientHandling(response);
            openSnackBar(
              `La Provincia con identificador ${entityId} ha sido eliminada con éxito`,
              "success"
            );
            break;
          case modalTypes.municipalities.delete.name:
            response = await deleteMunicipality(entityId);
            errorClientHandling(response);
            openSnackBar(
              `El Municipio con identificador ${entityId} ha sido eliminado con éxito`,
              "success"
            );
            break;
          case modalTypes.inventory.delete.name:
            response = await deleteInventoryEntry(entityId);
            errorClientHandling(response);
            openSnackBar(
              `La Entrada de inventario con identificador ${entityId} ha sido eliminada con éxito`,
              "success"
            );
            break;
          case modalTypes.zones.delete.name:
            response = await deleteZone(entityId);
            errorClientHandling(response);
            openSnackBar(
              `La Zona con identificador ${entityId} ha sido eliminada con éxito`,
              "success"
            );
            break;
          case modalTypes.users.delete.name:
            response = await deleteUser(entityId);
            errorClientHandling(response);
            openSnackBar(
              `El Usuario con identificador ${entityId} ha sido eliminado con éxito`,
              "success"
            );
            break;
          case modalTypes.categories.delete.name:
            response = await deleteCategory(entityId);
            errorClientHandling(response);
            openSnackBar(
              `La Categoría con identificador ${entityId} ha sido eliminada con éxito`,
              "success"
            );
            break;
          case modalTypes.promotions.delete.name:
            response = await deletePromotion(entityId);
            errorClientHandling(response);
            openSnackBar(
              `La Promoción con identificador ${entityId} ha sido eliminada con éxito`,
              "success"
            );
            break;
          case modalTypes.deliveryMethods.delete.name:
            response = await deleteDeliveryMethod(entityId);
            errorClientHandling(response);
            openSnackBar(
              `El Método de entrega con identificador ${entityId} ha sido eliminado con éxito`,
              "success"
            );
            break;
          default:
            break;
        }
        handleCloseModal();
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          if (error instanceof UnauthorizedClientError) {
            openAlertDialog(error.message, "error", () => {
              signOut({ redirect: true, callbackUrl: routes.login.path });
            });
          } else {
            setError(error.message);
            openSnackBar(error.message, "error");
          }
        }
      } finally {
        setIsLoading(false);
      }
    } else
      throw Error("No fue proporcionado un identificador para la eliminación");
  }

  return { deleteAction, isLoading, error };
}
