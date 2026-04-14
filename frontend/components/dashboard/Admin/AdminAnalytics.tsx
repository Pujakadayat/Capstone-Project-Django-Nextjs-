"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDashboard } from "@/hooks/useDashboard";
import { fetchOrders } from "@/services/orderService";
import { fetchProductById } from "@/services/productService";
import { Product } from "@/types/product";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { toast } from "sonner";

function downloadCsv(filename: string, rows: string[][]) {
  const esc = (c: string) => `"${String(c).replace(/"/g, '""')}"`;
  const body = rows.map((r) => r.map(esc).join(",")).join("\n");
  const blob = new Blob([body], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminAnalytics() {
  const { data: dash, isLoading: dashLoading } = useDashboard();

  const topIds = useMemo(
    () => dash?.top_products?.weekly?.map((t) => t.id).slice(0, 12) ?? [],
    [dash],
  );

  const detailQueries = useQueries({
    queries: topIds.map((id) => ({
      queryKey: ["product-detail", id],
      queryFn: () => fetchProductById(id),
      enabled: !!id,
    })),
  });

  const products: Product[] = detailQueries
    .map((q) => q.data)
    .filter((p): p is Product => !!p);

  const margins = useMemo(() => {
    return products
      .filter((p) => p.cost_price != null && p.selling_price != null)
      .map((p) => {
        const c = Number(p.cost_price);
        const s = Number(p.selling_price);
        const m = s - c;
        const pct = c ? (m / c) * 100 : 0;
        return { p, m, pct };
      })
      .sort((a, b) => b.m - a.m);
  }, [products]);

  const ordersQ = useQuery({
    queryKey: ["admin-orders-export"],
    queryFn: () => fetchOrders(1),
  });

  const exportOrders = () => {
    const data = ordersQ.data;
    if (!data?.results?.length) {
      toast.error("No orders to export");
      return;
    }
    const header = [
      "order_number",
      "customer",
      "created_at",
      "status",
      "total_amount",
      "total_profit",
    ];
    const rows = [
      header,
      ...data.results.map((o) => [
        o.order_number,
        o.customer_name ?? "",
        o.created_at,
        o.status,
        o.total_amount,
        o.total_profit ?? "",
      ]),
    ];
    downloadCsv("orders-page-1.csv", rows);
    toast.success("CSV downloaded (first page)");
  };

  const detailsPending = detailQueries.some((q) => q.isLoading);

  return (
    <div className="space-y-10">
      <div className="border-b border-slate-200 pb-6">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-teal-700">
          Finance
        </p>
        <h1 className="text-2xl font-bold text-slate-900">
          Profit &amp; reporting
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Margins are computed from weekly top sellers (detail fetch). CSV
          includes order totals and profit where the API provides it.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          className="rounded-lg bg-slate-900 hover:bg-teal-900"
          disabled={ordersQ.isLoading}
          onClick={exportOrders}
        >
          Download orders CSV
        </Button>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold text-slate-900">
          Top sellers — cost vs sell
        </h2>
        {(dashLoading || detailsPending) && (
          <p className="text-sm text-slate-500">Loading catalog detail…</p>
        )}
        {!dashLoading && !detailsPending && (
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="text-xs uppercase">Product</TableHead>
                  <TableHead className="text-xs uppercase">SKU</TableHead>
                  <TableHead className="text-xs uppercase">Cost</TableHead>
                  <TableHead className="text-xs uppercase">Sell</TableHead>
                  <TableHead className="text-xs uppercase">Margin</TableHead>
                  <TableHead className="text-xs uppercase">Margin %</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {margins.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="py-8 text-center text-slate-500"
                    >
                      No cost/sell data for top weekly SKUs (variants-only
                      products may omit base prices).
                    </TableCell>
                  </TableRow>
                ) : (
                  margins.map(({ p, m, pct }) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.name}</TableCell>
                      <TableCell className="font-mono text-xs">
                        {p.sku}
                      </TableCell>
                      <TableCell>Rs. {p.cost_price}</TableCell>
                      <TableCell>Rs. {p.selling_price}</TableCell>
                      <TableCell className="font-semibold text-teal-800">
                        Rs. {m.toFixed(2)}
                      </TableCell>
                      <TableCell>{pct.toFixed(1)}%</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
