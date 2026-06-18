

"use client";

import { useDashboard } from "@/hooks/useDashboard";
import OverviewChart from "./OverviewChart";

export default function AdminDashboard() {
  const { data, isLoading, isError } = useDashboard();

  if (isLoading) return <p>Loading dashboard...</p>;

  if (isError || !data) return <p>Failed to load dashboard</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* KPI */}
      <div className="grid grid-cols-4 gap-4">
        <div>Total Revenue: {data.kpi.total_revenue}</div>
        <div>Total Orders: {data.kpi.total_orders}</div>
        <div>Customers: {data.kpi.total_customers}</div>
        <div>Low Stock: {data.kpi.low_stock_count}</div>
      </div>

      {/* Chart */}
      <OverviewChart />

      {/* Products */}
      <div>
        <h2 className="font-semibold">Top Products</h2>
        {data.top_products.weekly.map((p) => (
          <div key={p.id}>
            {p.name} - {p.qty_sold}
          </div>
        ))}
      </div>
    </div>
  );
}
