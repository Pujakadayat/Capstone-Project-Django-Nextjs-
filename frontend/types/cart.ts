export interface CartItem {
  id: string;
  product: string;
  product_name: string;
  product_image?: string | null;
  product_variant: string | null;
  variant_info: {
    id: string;
    sku: string;
    variations: string[];
  } | null;
  quantity: number;
  unit_price: string;
  line_total: string;
}

export interface Cart {
  id: string;
  user_name: string;
  created_at: string;
  updated_at: string;
  total: string;
  item_count: number;
  items: CartItem[];
}
