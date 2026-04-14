"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderListItem, useOrderMutations, useOrdersList } from "@/hooks/useOrders";
import { OrderStatus } from "@/types/orders";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const STATUSES: OrderStatus[] = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELED",
];

export default function OrdersPageContent({
  mode,
}: {
  mode: "staff" | "customer";
}) {
  const { data, isLoading, isError, page, setPage } = useOrdersList();
  const { patchStatus } = useOrderMutations();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const rows: OrderListItem[] = data?.results ?? [];
  const canManage = mode === "staff";

  const onStatusChange = (id: string, status: OrderStatus) => {
    setUpdatingId(id);
    patchStatus.mutate(
      { id, body: { status } },
      {
        onSuccess: () => toast.success("Order updated"),
        onError: () => toast.error("Update failed"),
        onSettled: () => setUpdatingId(null),
      },
    );
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-6">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-teal-700">
          {canManage ? "Operations" : "Account"}
        </p>
        <h1 className="text-2xl font-bold text-slate-900">
          {canManage ? "Order management" : "Order history"}
        </h1>
      </div>

      {isLoading && (
        <p className="text-sm text-slate-500">Loading orders…</p>
      )}
      {isError && (
        <p className="text-sm text-red-600">Failed to load orders.</p>
      )}

      {!isLoading && !isError && (
        <>
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="text-xs font-bold uppercase">
                    Order
                  </TableHead>
                  {canManage && (
                    <TableHead className="text-xs font-bold uppercase">
                      Customer
                    </TableHead>
                  )}
                  <TableHead className="text-xs font-bold uppercase">
                    Date
                  </TableHead>
                  <TableHead className="text-xs font-bold uppercase">
                    Total
                  </TableHead>
                  <TableHead className="text-xs font-bold uppercase">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={canManage ? 5 : 4}
                      className="py-12 text-center text-slate-500"
                    >
                      No orders yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  rows.map((o) => (
                    <TableRow key={o.id}>
                      <TableCell className="font-mono text-sm">
                        {o.order_number}
                      </TableCell>
                      {canManage && (
                        <TableCell className="text-sm">
                          {o.customer_name ?? "—"}
                        </TableCell>
                      )}
                      <TableCell className="text-sm text-slate-600">
                        {new Date(o.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-sm font-medium">
                        Rs. {o.total_amount}
                      </TableCell>
                      <TableCell>
                        {canManage ? (
                          <Select
                            value={o.status}
                            disabled={updatingId === o.id}
                            onValueChange={(v) =>
                              onStatusChange(o.id, v as OrderStatus)
                            }
                          >
                            <SelectTrigger className="h-8 w-[160px] rounded-lg text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {STATUSES.map((s) => (
                                <SelectItem key={s} value={s}>
                                  {s}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Badge variant="secondary" className="rounded-md">
                            {o.status}
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="rounded-lg"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            <span className="text-sm text-slate-600">Page {page}</span>
            <Button
              variant="outline"
              size="sm"
              className="rounded-lg"
              disabled={!data?.next}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>

          {!canManage && (
            <p className="text-center text-sm text-slate-500">
              Need something else?{" "}
              <Link href="/products" className="text-teal-800 underline">
                Continue shopping
              </Link>
            </p>
          )}
        </>
      )}
    </div>
  );
}
