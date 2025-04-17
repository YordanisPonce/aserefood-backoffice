import {
  CreateProductComboItem,
  ProductComboDetails,
} from "@/lib/types/productCombo";
import { ZoneProduct } from "@/lib/types/products";

export function getProductsInComboWithAmount(
  zoneProducts: ZoneProduct[],
  combo: ProductComboDetails
): CreateProductComboItem[] {
  return combo.productComboItems
    .map(comboItem => {
      const match = zoneProducts.find(
        zp => zp.product.id === comboItem.productId
      );
      if (!match) return null;

      return {
        product: match,
        amount: comboItem.amount,
      };
    })
    .filter(Boolean) as CreateProductComboItem[];
}
