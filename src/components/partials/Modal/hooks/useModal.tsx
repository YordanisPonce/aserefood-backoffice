"use client";
import { useRef, useState } from "react";

export default function useModal() {
  const [currentModal, setCurrentModal] = useState<string | null>(null);
  const [entityId, setEntityId] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleOpenModal = (modalName: string, entityId?: string) => {
    setCurrentModal(modalName);
    if (entityId) {
      setEntityId(entityId);
    }
  };

  const handleCloseModal = () => {
    setCurrentModal(null);
    setEntityId(null);
  };
  return {
    entityId,
    handleCloseModal,
    currentModal,
    handleOpenModal,
    contentRef,
  };
}
