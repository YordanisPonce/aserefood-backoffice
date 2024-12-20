export interface ProductCombo {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  referencePrice: number;
  zoneId: number;
  zoneName: string;
  isActive: boolean;
}

export interface ProductComboDetails {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  image: string;
  price: number;
  referencePrice: number;
  zoneId: number;
  zoneName: string;
  isActive: true;
  productComboItems: {
    id: number;
    productId: number;
    productName: string;
    amount: number;
  }[];
}

export interface CreateProductCombo {
  name: string;
  shortDescription: string;
  description: string;
  image: File | null;
  price: number;
  zone: {
    id: number;
    name: string;
  } | null;
  isActive: StatesProductCombos;
  productComboItems: CreateProductComboItem[];
}

export interface CreateProductComboItem {
  product: {
    id: number;
    name: string;
  } | null;
  amount: number;
}

export interface CreateProductComboDTO {
  name: string;
  shortDescription: string;
  description: string;
  image: string | null;
  price: number;
  zoneId: number;
  isActive: boolean;
  productComboItems: {
    productId: number;
    amount: number;
  }[];
}

export enum StatesProductCombos {
  ACTIVE = "Activo",
  INACTIVE = "Inactivo",
}
