export interface Promotion {
  id: number;
  code: string;
  name: string;
  description: string;
  discountOption: number;
  discountValue: number;
  isActive: true;
  startDate: string;
  endDate: string;
}

export interface PromotionDetails {
  id: number;
  code: string;
  name: string;
  description: string;
  discountOption: number;
  discountValue: number;
  image: string | null;
  isActive: true;
  productCombos: {
    id: number;
    name: string;
  }[];
  products: {
    id: number;
    name: string;
  }[];
  startDate: string;
  endDate: string;
}

export interface CreatePromotion {
  code: string;
  name: string;
  description: string;
  discountOption: DiscountOption;
  discountValue: number;
  image: File | null;
  startDate: string;
  endDate: string;
  isActive: StatesPromotions;
  productCombos: {
    id: number;
    name: string;
  }[];
  products: {
    id: number;
    name: string;
  }[];
}

export interface CreatePromotionDTO {
  code: string;
  name: string;
  description: string;
  discountOption: number;
  discountValue: number;
  image: string | null;
  startDate: string;
  endDate: string;
  isActive: boolean;
  productComboIds: number[];
  productIds: number[];
}

export enum DiscountOption {
  PERCENTAGE = "Porcentaje",
  FIXED_AMOUNT = "Cantidad Fija",
}

export enum StatesPromotions {
  ACTIVA = "Activa",
  INACTIVA = "Inactiva",
}
