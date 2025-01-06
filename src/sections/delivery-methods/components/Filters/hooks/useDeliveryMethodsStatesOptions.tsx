"use client";
import { useEffect, useState } from "react";

interface Props {
  isFree?: boolean;
}

export default function useDeliveryMethodsStatesOptions({ isFree }: Props) {
  const deliveryMethodsStates = [
    {
      value: 0,
      name: "Sin Filtros",
    },
    {
      value: 1,
      name: "Gratis",
    },
    {
      value: 2,
      name: "De pago",
    },
  ];
  const [selectState, setSelectState] = useState(0);

  useEffect(() => {
    setSelectState(isFree === undefined ? 0 : isFree ? 1 : 2);
  }, [isFree]);

  return { deliveryMethodsStates, selectState };
}
