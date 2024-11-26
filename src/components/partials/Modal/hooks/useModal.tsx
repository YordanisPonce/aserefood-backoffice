"use client";
import useUrlParams from "@/lib/hooks/useUrlParams";
import { useSearchParams } from "next/navigation";

export default function useModal() {
  const { updateSearchParams } = useUrlParams();
  const params = useSearchParams();
  const currentModal = params.get("currentModal");
  const entityId = params.get("entityId");

  const handleOpenModal = (modalName: string, entityId?: string) => {
    updateSearchParams(
      entityId
        ? {
            currentModal: {
              action: "set",
              value: modalName,
            },
            entityId: {
              action: "set",
              value: entityId,
            },
          }
        : {
            currentModal: {
              action: "set",
              value: modalName,
            },
          }
    );
  };

  const handleCloseModal = () => {
    updateSearchParams({
      currentModal: {
        action: "delete",
        value: "",
      },
      entityId: {
        action: "delete",
        value: "",
      },
    });
  };
  return { entityId, handleCloseModal, currentModal, handleOpenModal };
}
