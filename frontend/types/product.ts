import { Brand } from "./brand";
import { ProductCategory } from "./category";

export interface Product {
  id: string;
  name: string;
  sku: string;
  reorder_point: number;
  image?: string | null;
  description?: string;
  stock: number;
  has_variant: boolean;
  cost_price?: number | null;
  selling_price?: number | null;
  brand?: Brand | null;
  categories: ProductCategory[];
  total_stock: number;
  is_low_stock: boolean;
  created_at: string;
  updated_at: string;
}