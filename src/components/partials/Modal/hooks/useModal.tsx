"use client";
import useUrlParams from "@/lib/hooks/useUrlParams";
import { useSearchParams } from "next/navigation";

export default function useModal() {
  const { updateSearchParams } = useUrlParams();
  const params = useSearchParams();
  const currentModal = params.get("currentModal");
  const entityId = params.get("entityId");

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
  return { entityId, handleCloseModal, currentModal };
}
