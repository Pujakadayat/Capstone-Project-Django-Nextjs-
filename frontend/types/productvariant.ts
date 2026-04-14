import { Product } from "./product";

export interface VariationType {
  id: string;
  name: string;
  is_active: boolean;
}

export interface VariationValue {
  id: string;
  value: string;
  variation_type: VariationType;
  is_active: boolean;
}

export interface ProductVariant {
  id: string;
  sku: string;
  product: string;
  product_name: string;
  variations: VariationValue[];
  cost_price?: number | null;
  selling_price?: number | null;
  get_cost_price: number;
  get_selling_price: number;
  stock: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
