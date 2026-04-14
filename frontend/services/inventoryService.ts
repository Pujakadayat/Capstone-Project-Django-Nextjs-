import api from "@/lib/api";
export interface InventoryRow {
  id: string;
  created_at: string;
  stock_before: number;
  stock_after: number;
  product: string;
  product_name: string;
  product_sku: string;
  transaction_type: string;
  notes?: string | null;
  product_variant: { id: string; sku: string } | null;
}

export interface PaginatedInventory {
  results: InventoryRow[];
  count?: number;
}

export const fetchInventory = async (page = 1): Promise<PaginatedInventory> => {
  const res = await api.get(`api/v1/inventory/?page=${page}`);
  return res.data;
};

export const createStockMovement = async (body: {
  product: string;
  product_variant?: string | null;
  quantity: number;
  transaction_type: "RECEIVE" | "ADJUSTMENT" | "RETURN" | "SALE";
  notes?: string;
}) => {
  const res = await api.post("api/v1/inventory/create/", body);
  return res.data;
};
