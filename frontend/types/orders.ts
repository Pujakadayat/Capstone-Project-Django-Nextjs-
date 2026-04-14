export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELED";

export interface OrderItemRow {
  id: string;
  product: string;
  product_name: string;
  product_variant: string | null;
  variant_info: {
    id: string;
    sku: string;
    variations: string[];
  } | null;
  quantity: number;
  unit_price: string;
  unit_cost: string;
  line_total: string;
  line_profit?: string;
}

export interface OrderDetail {
  id: string;
  created_at: string;
  updated_at: string;
  order_number: string;
  customer_name?: string;
  processed_by?: string | null;
  subtotal: string;
  discount_amount?: string;
  tax_amount?: string;
  total_amount: string;
  shipping_address: string;
  notes?: string;
  status: OrderStatus;
  items: OrderItemRow[];
  total_profit?: string;
}
