import { SerializableFile } from "../utils/fileTransformers";
import { SearchParams } from "./pagination";

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
  discountOption: string;
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
  discountOption: DiscountOption;
  discountValue: number;
  image: SerializableFile | null;
  startDate: string;
  endDate: string;
  isActive: boolean;
  productComboIds: number[];
  productIds: number[];
}

export enum DiscountOption {
  PERCENTAGE = 1,
  FIXED_AMOUNT = 2,
}

export enum StatesPromotions {
  ACTIVA = "Activa",
  INACTIVA = "Inactiva",
}

export const promotionsDiscountOptionMap: Map<DiscountOption, string> = new Map(
  [
    [DiscountOption.PERCENTAGE, "Porcentaje"],
    [DiscountOption.FIXED_AMOUNT, "Cantidad Fija"],
  ]
);

export const invertedPromotionsDiscountOptionMap: Map<string, DiscountOption> =
  new Map(
    Array.from(promotionsDiscountOptionMap.entries()).map(([key, value]) => [
      value,
      key,
    ])
  );

// filters
export interface PromotionsFilters extends SearchParams {
  productComboId?: number;
  productId?: number;
  isActive?: boolean;
}
