export interface DeliveryMethod {
  id: number;
  name: string;
  estimatedArrivalTime: string;
  isFree: boolean;
  pickUpDirection: string;
  cost: number;
  minimalDeliveryPrice: number;
}

export interface DeliveryMethodDetails {
  id: number;
  name: string;
  estimatedArrivalTime: string;
  isFree: boolean;
  pickUpDirection: string;
  cost: number;
  minimalDeliveryPrice: number;
  municipality: {
    id: number;
    name: string;
    provinceId: number;
    provinceName: string;
  };
}

export interface CreateDeliveryMethod {
  name: string;
  estimatedArrivalTime: string;
  isFree: boolean;
  pickUpDirection: string;
  cost: number;
  minimalDeliveryPrice: number;
  municipality: {
    id: number;
    name: string;
  } | null;
}

export interface CreateDeliveryMethodDTO {
  name: string;
  estimatedArrivalTime: string;
  isFree: boolean;
  pickUpDirection: string;
  cost: number;
  minimalDeliveryPrice: number;
  municipalityId: number;
}
