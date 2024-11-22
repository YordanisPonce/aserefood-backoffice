import React, { useState } from "react";

export default function useProductsFiltersOptions() {
  // Data example
  const [categories, setCategories] = useState(["Primera", "Segunda"]);
  const [serviceOptions, setServiceOptions] = useState([
    "Disponible",
    "No disponible",
  ]);
  return { categories, serviceOptions };
}
