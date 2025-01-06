import { SearchParams } from "./pagination";

export interface InventoryEntry {
  id: number;
  productId: number;
  productName: string;
  zoneId: number;
  zoneName: string;
  price: number;
  quantity: number;
}

export interface InventoryEntryDetails {
  id: number;
  productId: number;
  productName: string;
  zoneId: number;
  zoneName: string;
  price: number;
  quantity: number;
}

export interface CreateInventoryEntry {
  product: {
    id: number;
    name: string;
  } | null;
  zone: {
    id: number;
    name: string;
  } | null;
  price: number;
  quantity: number;
}

export interface CreateInventoryEntryDTO {
  quantity: number;
  price: number;
  productId: number;
  zoneId: number;
}

export interface UpdateInventoryEntry {
  quantity: 0;
  price: 0;
}

export interface UpdateInventoryEntryDTO {
  quantity: 0;
  price: 0;
}

// filters
export interface InventoryEntriesFilters extends SearchParams {
  zoneId?: number;
  productId?: number;
}
