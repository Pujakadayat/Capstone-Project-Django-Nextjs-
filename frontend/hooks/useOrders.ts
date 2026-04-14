"use client";

import {
  createOrder,
  fetchOrder,
  fetchOrders,
  updateOrderStatus,
} from "@/services/orderService";
import type { OrderListItem, PaginatedOrders } from "@/services/orderService";
import type { OrderDetail } from "@/types/orders";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import { cartQueryKey } from "./useCart";

export function useOrdersList() {
  const [page, setPage] = useState(1);
  const query = useQuery<PaginatedOrders>({
    queryKey: ["orders", page],
    queryFn: () => fetchOrders(page),
    placeholderData: keepPreviousData,
  });
  return { ...query, page, setPage };
}

export function useOrderDetail(id: string | null) {
  return useQuery<OrderDetail>({
    queryKey: ["order", id],
    queryFn: () => fetchOrder(id!),
    enabled: !!id,
  });
}

export function useOrderMutations() {
  const queryClient = useQueryClient();

  const placeOrder = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: cartQueryKey });
    },
  });

  const patchStatus = useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string;
      body: { status?: string; notes?: string };
    }) => updateOrderStatus(id, body),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order", variables.id] });
    },
  });

  return { placeOrder, patchStatus };
}

export type { OrderListItem, PaginatedOrders };
