"use client";
import { ProductDTO } from "@/lib/dto/ProductDTO";
import React, { useState } from "react";

export default function useProducts() {
  //Data example
  const [products, setProducts] = useState<ProductDTO[]>([
    {
      id: "0",
      name: "Product1",
      description: "des",
      shortDescription: "des short",
      categoryName: "name category",
      isService: true,
      providers: [
        { id: "0", name: "Provider 1" },
        { id: "1", name: "Provider 2" },
      ],
    },
    {
      id: "1",
      name: "Product2",
      description: "des",
      shortDescription: "des short",
      categoryName: "name category",
      isService: false,
      providers: [
        { id: "2", name: "Provider 3" },
        { id: "3", name: "Provider 4" },
      ],
    },
  ]);
  return { products };
}
