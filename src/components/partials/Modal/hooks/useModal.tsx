"use client";
import useUrlParams, { UrlParamsType } from "@/lib/hooks/useUrlParams";
import { useSearchParams } from "next/navigation";

export default function useModal() {
  const { updateSearchParams } = useUrlParams();
  const params = useSearchParams();
  const currentModal = params.get("currentModal");
  const entityId = params.get("entityId");

  const handleOpenModal = (modalName: string, entityId?: string) => {
    const params: UrlParamsType | UrlParamsType[] = {
      currentModal: {
        action: "set",
        value: modalName,
      },
      ...(entityId && {
        entityId: {
          action: "set",
          value: entityId,
        },
      }),
    };
  
    updateSearchParams(params);
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
