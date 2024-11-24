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
  categoryId: number;
  providerIds: number[];
  isService: boolean;
}

export interface CreateProduct {
  name: string;
  description: string;
  shortDescription: string;
  category: {
    id: number;
    name: string;
  };
  provider: {
    id: number;
    name: string;
  };
}

export interface ProductDetails {
  id: number;
  name: string;
  description: string;
  shortDescription: string;
  isService: boolean;
  categoryId: number;
  categoryName: string;
  providers: Provider[];
}
