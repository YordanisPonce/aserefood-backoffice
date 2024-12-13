import { Provider } from "./provider";

export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  isService: boolean;
  categoryId: number;
  categoryName: string;
}

export interface CreateProductDTO {
  name: string;
  description: string;
  shortDescription: string;
  image: string | null;
  categoryId: number;
  providerIds: number[];
  isService: boolean;
}

export interface CreateProduct {
  name: string;
  description: string;
  shortDescription: string;
  image: File | null;
  category: {
    id: number;
    name: string;
  } | null;
  providers: {
    id: number;
    name: string;
  }[];
}

export interface ProductDetails {
  id: number;
  name: string;
  image: string;
  description: string;
  shortDescription: string;
  image: string;
  isService: boolean;
  categoryId: number;
  categoryName: string;
  providers: Provider[];
}
