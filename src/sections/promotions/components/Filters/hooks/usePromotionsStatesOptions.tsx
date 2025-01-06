"use client";
import { useEffect, useState } from "react";

interface Props {
  isActive?: boolean;
}

export default function usePromotionsStatesOptions({ isActive }: Props) {
  const promotionsStates = [
    {
      value: 0,
      name: "Sin Filtros",
    },
    {
      value: 1,
      name: "Activa",
    },
    {
      value: 2,
      name: "Inactiva",
    },
  ];
  const [selectState, setSelectState] = useState(0);

  useEffect(() => {
    setSelectState(isActive === undefined ? 0 : isActive ? 1 : 2);
  }, [isActive]);
  return { promotionsStates, selectState };
}
