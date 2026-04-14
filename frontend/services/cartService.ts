import api from "@/lib/api";
import { Cart } from "@/types/cart";

export const fetchCart = async (): Promise<Cart> => {
  const res = await api.get("api/v1/orders/cart/");
  return res.data;
};

export const addCartItem = async (body: {
  product: string;
  product_variant?: string | null;
  quantity: number;
}) => {
  const res = await api.post("api/v1/orders/cartitem/", body);
  return res.data;
};

export const patchCartItem = async (
  id: string,
  body: { quantity?: number; product?: string; product_variant?: string | null },
) => {
  const res = await api.patch(`api/v1/orders/cartitem/${id}/`, body);
  return res.data;
};

export const deleteCartItem = async (id: string) => {
  const res = await api.delete(`api/v1/orders/cartitem/${id}/`);
  return res.data;
};
