import api from "@/lib/api";

export interface OrderListItem {
  id: string;
  order_number: string;
  customer_name?: string;
  created_at: string;
  status: string;
  total_amount: string;
  total_profit?: string;
  shipping_address?: string;
  notes?: string;
  items?: unknown[];
}

export interface PaginatedOrders {
  results: OrderListItem[];
  count?: number;
  next?: string | null;
  previous?: string | null;
}

export const fetchOrders = async (page = 1): Promise<PaginatedOrders> => {
  const res = await api.get(`api/v1/orders/?page=${page}`);
  return res.data;
};

export const fetchOrder = async (id: string) => {
  const res = await api.get(`api/v1/orders/${id}/`);
  return res.data;
};

export const createOrder = async (body: {
  shipping_address: string;
  notes?: string;
  items: { product: string; product_variant?: string | null; quantity: number }[];
}) => {
  const res = await api.post("api/v1/orders/", body);
  return res.data;
};

export const updateOrderStatus = async (
  id: string,
  body: { status?: string; notes?: string },
) => {
  const res = await api.patch(`api/v1/orders/${id}/`, body);
  return res.data;
};
