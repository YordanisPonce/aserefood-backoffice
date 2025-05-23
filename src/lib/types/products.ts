import { Category } from "./category";
import { SearchParams } from "./pagination";
import { Provider } from "./provider";

export interface Product {
  id: number;
  name: string;
  description: string;
  shortDescription: string;
  isService: boolean;
  isInInventory?: boolean;
}

export interface CreateProductDTO {
  name: string;
  description: string;
  shortDescription: string;
  image: string | null;
  categoryIds: number[];
  providerIds: number[];
  isService: boolean;
}

export interface CreateProduct {
  name: string;
  description: string;
  shortDescription: string;
  image: File | null;
  isService: boolean;
  categories: {
    id: number;
    name: string;
  }[];
  providers: {
    id: number;
    name: string;
  }[];
}

export interface ProductDetails {
  id: number;
  name: string;
  image: string | null;
  description: string;
  shortDescription: string;
  isService: boolean;
  categories: Category[];
  providers: Provider[];
}

export enum StatesProducts {
  SERVICE = "Con servicio",
  NOTSERVICE = "Sin servicio",
}

// filers
export interface ProductsFilters extends SearchParams {
  providerId?: number;
  isService?: boolean;
  categoryIds?: number[];
}

export interface ZoneProduct {
  inventoryAmount: number;
  isAvailable: boolean;
  price: number;
  product: Product;
}
