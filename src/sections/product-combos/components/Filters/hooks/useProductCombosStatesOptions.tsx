"use client";
import { useEffect, useState } from "react";

interface Props {
  isActive?: boolean;
}

export default function useProductsCombosStatesOptions({ isActive }: Props) {
  const productCombosStates = [
    {
      value: 0,
      name: "Sin Filtros",
    },
    {
      value: 1,
      name: "Activo",
    },
    {
      value: 2,
      name: "Inactivo",
    },
  ];
  const [selectState, setSelectState] = useState(0);

  useEffect(() => {
    setSelectState(isActive === undefined ? 0 : isActive ? 1 : 2);
  }, [isActive]);
  return { productCombosStates, selectState };
}
