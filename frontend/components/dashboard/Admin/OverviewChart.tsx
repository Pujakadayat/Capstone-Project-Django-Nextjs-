
"use client";

import { useDashboard } from "@/hooks/useDashboard";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function OverviewChart() {
  const { data, isLoading } = useDashboard();

  if (isLoading || !data) return <p>Loading chart...</p>;

  const chart = data.charts.weekly_sales.map((d) => ({
    ...d,
    label: d.date.slice(5),
  }));

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chart}>
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Area dataKey="revenue" stroke="#0f766e" fill="#0f766e" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
