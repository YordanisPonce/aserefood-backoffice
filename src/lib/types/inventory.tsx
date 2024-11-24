export interface InventoryEntry {
  id: number;
  productId: number;
  productName: string;
  zoneId: number;
  zoneName: string;
  price: number;
  quantity: number;
}

export interface CreateInventoryEntryDTO {
  quantity: number;
  price: number;
  productId: number;
  zoneId: number;
}
