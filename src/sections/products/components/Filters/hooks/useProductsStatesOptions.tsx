import { useEffect, useState } from "react";

interface Props {
  isService?: boolean;
}

export default function useProductsStatesOptions({ isService }: Props) {
  const productsStates = [
    {
      value: 0,
      name: "Sin Filtros",
    },
    {
      value: 1,
      name: "Con Servicio",
    },
    {
      value: 2,
      name: "Sin servicio",
    },
  ];
  const [selectState, setSelectState] = useState(0);

  useEffect(() => {
    setSelectState(isService === undefined ? 0 : isService ? 1 : 2);
  }, [isService]);

  return { productsStates, selectState };
}
