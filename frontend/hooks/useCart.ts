"use client";

import {
  addCartItem,
  deleteCartItem,
  fetchCart,
  patchCartItem,
} from "@/services/cartService";
import { Cart } from "@/types/cart";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const cartQueryKey = ["cart"] as const;

export function useCart(enabled = true) {
  const queryClient = useQueryClient();

  const query = useQuery<Cart>({
    queryKey: cartQueryKey,
    queryFn: fetchCart,
    enabled,
  });

  const addItem = useMutation({
    mutationFn: addCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartQueryKey });
    },
  });

  const updateItem = useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string;
      body: Parameters<typeof patchCartItem>[1];
    }) => patchCartItem(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartQueryKey });
    },
  });

  const removeItem = useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartQueryKey });
    },
  });

  return {
    ...query,
    addItem,
    updateItem,
    removeItem,
  };
}
