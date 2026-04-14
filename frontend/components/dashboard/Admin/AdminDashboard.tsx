// "use client";

// import { StatCard } from "@/components/common/StatCard";
// import { useDashboard } from "@/hooks/useDashboard";
// import { AdminDashboardData, SalesData } from "@/types/dashboard";
// import {
//   CartesianGrid,
//   Line,
//   LineChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { motion } from "framer-motion";

// const OverviewChart = () => {
//   const { data, isLoading, isError } = useDashboard();
//   const chartdata = data?.charts.weekly_sales;
//   if (isError) {
//     return (
//       <p className="text-[12px] uppercase text-red-500 py-10">
//         Failed to load data.
//       </p>
//     );
//   }
//   return (
//     <motion.div
//       className="bg-white backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 border border-amber-50 mx-2 md:mx-0"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 0.2, duration: 0.5 }}
//     >
//       <h2 className="text-base md:text-lg font-medium mb-4 text-black-100 text-center mdLtext-left">
//         Sales Performance
//       </h2>
//       <div className="h-64 md:h-80">
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={chartdata}>
//             <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
//             <XAxis
//               dataKey="name"
//               stroke="#9ca3af"
//               tick={{ fontSize: 12 }}
//               interval="preserveStartEnd"
//             />
//             <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} width={40} />
//             <Tooltip
//               contentStyle={{
//                 backgroundColor: "rgba(31,41,55,0.8)",
//                 borderColor: "#4b55b3",
//                 fontSize: "12px",
//               }}
//               itemStyle={{ color: "#e5e7eb" }}
//             />
//             <Line
//               type="monotone"
//               dataKey="sales"
//               stroke="#9c27b0"
//               dot={{ fill: "#9c27b0", strokeWidth: 2, r: 4 }}
//               activeDot={{ r: 6, strokeWidth: 2 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//       OverviewChart
//     </motion.div>
//   );
// };

// export default OverviewChart;

// "use client";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../../ui/table";
// import { Button } from "../../ui/button";
// import { Card, CardContent } from "../../ui/card";
// import OverviewChart from "./OverviewChart";
// import { useDashboard } from "@/hooks/useDashboard";
// import Link from "next/link";
// import { Activity, TrendingUp } from "lucide-react";

// function formatMoney(n: number) {
//   return new Intl.NumberFormat(undefined, {
//     maximumFractionDigits: 2,
//   }).format(n);
// }

// export const AdminDashboard = () => {
//   const { data, isLoading, isError } = useDashboard();

//   if (isLoading) {
//     return (
//       <div className="space-y-6">
//         <div className="h-10 w-64 animate-pulse rounded-lg bg-slate-100" />
//         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//           {Array.from({ length: 4 }).map((_, i) => (
//             <div key={i} className="h-28 animate-pulse rounded-xl bg-slate-100" />
//           ))}
//         </div>
//       </div>
//     );
//   }

//   if (isError || !data) {
//     return (
//       <p className="text-sm font-medium text-red-600">
//         Failed to load dashboard data.
//       </p>
//     );
//   }

//   const kpi = data.kpi;
//   const weeklyTop = data.top_products.weekly;
//   const lowStock = data.low_stock_products.slice(0, 6);

//   const cards: {
//     label: string;
//     value: string;
//     hint?: string;
//     delta?: string;
//     positive?: boolean;
//   }[] = [
//     {
//       label: "Total revenue",
//       value: `Rs. ${formatMoney(Number(kpi.total_revenue))}`,
//       delta: "+5.2%",
//       positive: true,
//     },
//     {
//       label: "Total orders",
//       value: String(kpi.total_orders),
//       delta: "+1.4%",
//       positive: false,
//     },
//     {
//       label: "Customers",
//       value: String(kpi.total_customers),
//       delta: "+24%",
//       positive: true,
//     },
//     {
//       label: "Low-stock SKUs",
//       value: String(kpi.low_stock_count),
//       hint: "Needs attention",
//     },
//   ];

//   return (
//     <div className="space-y-10">
//       <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-6">
//         <div>
//           <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-700">
//             Executive overview
//           </p>
//           <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
//             Architect command center
//           </h1>
//         </div>
//         <div className="flex flex-wrap gap-2">
//           <Button variant="outline" className="rounded-lg border-slate-300" asChild>
//             <Link href="/dashboard/analytics">Profit &amp; reports</Link>
//           </Button>
//           <Button className="rounded-lg bg-slate-900 hover:bg-teal-900" asChild>
//             <Link href="/dashboard/products">Manage products</Link>
//           </Button>
//         </div>
//       </div>

//       <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
//         {cards.map((c) => (
//           <Card key={c.label} className="rounded-xl border-slate-200 shadow-sm">
//             <CardContent className="relative p-5">
//               {c.delta && (
//                 <span
//                   className={`absolute right-4 top-4 rounded-full px-2 py-0.5 text-[10px] font-bold ${
//                     c.positive
//                       ? "bg-teal-100 text-teal-900"
//                       : "bg-amber-100 text-amber-900"
//                   }`}
//                 >
//                   {c.delta}
//                 </span>
//               )}
//               <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
//                 {c.label}
//               </p>
//               <p className="mt-2 text-2xl font-bold text-slate-900">{c.value}</p>
//               {c.hint && (
//                 <p className="mt-1 text-[11px] text-slate-500">{c.hint}</p>
//               )}
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <div className="grid gap-6 lg:grid-cols-3">
//         <div className="lg:col-span-2">
//           <OverviewChart />
//         </div>
//         <Card className="rounded-xl border-slate-200 shadow-sm">
//           <CardContent className="flex flex-col items-center justify-center gap-2 p-6 text-center">
//             <div className="flex h-36 w-36 items-center justify-center rounded-full border-8 border-teal-100 text-center">
//               <div>
//                 <p className="text-2xl font-bold text-teal-800">72%</p>
//                 <p className="text-[10px] font-semibold uppercase text-slate-500">
//                   Optimized
//                 </p>
//               </div>
//             </div>
//             <p className="mt-4 text-xs font-medium text-slate-600">
//               System load snapshot
//             </p>
//             <div className="mt-2 h-2 w-full max-w-[200px] overflow-hidden rounded-full bg-slate-100">
//               <div className="h-full w-[42%] rounded-full bg-teal-600" />
//             </div>
//             <p className="text-[11px] text-slate-500">CPU usage · 42%</p>
//           </CardContent>
//         </Card>
//       </div>

//       <div>
//         <div className="mb-4 flex items-center justify-between">
//           <h2 className="text-lg font-semibold text-slate-900">
//             Weekly top selling products
//           </h2>
//           <Link
//             href="/dashboard/products"
//             className="text-sm font-semibold text-teal-800 hover:underline"
//           >
//             View all inventory
//           </Link>
//         </div>
//         <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
//           <Table>
//             <TableHeader>
//               <TableRow className="bg-slate-50">
//                 <TableHead className="text-xs uppercase">Product</TableHead>
//                 <TableHead className="text-xs uppercase">SKU</TableHead>
//                 <TableHead className="text-xs uppercase">Qty sold</TableHead>
//                 <TableHead className="text-xs uppercase">Revenue</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {weeklyTop.length === 0 ? (
//                 <TableRow>
//                   <TableCell
//                     colSpan={4}
//                     className="py-8 text-center text-slate-500"
//                   >
//                     No sales in the selected window.
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 weeklyTop.map((row) => (
//                   <TableRow key={row.id}>
//                     <TableCell className="font-medium">{row.name}</TableCell>
//                     <TableCell className="font-mono text-xs">{row.sku}</TableCell>
//                     <TableCell>{row.qty_sold}</TableCell>
//                     <TableCell>Rs. {formatMoney(Number(row.revenue))}</TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </div>
//       </div>

//       {lowStock.length > 0 && (
//         <div className="grid gap-4 md:grid-cols-3">
//           <Card className="rounded-xl border-slate-200 md:col-span-2">
//             <CardContent className="p-5">
//               <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
//                 <TrendingUp className="h-4 w-4 text-amber-600" />
//                 Low stock watchlist
//               </div>
//               <ul className="space-y-2 text-sm text-slate-600">
//                 {lowStock.map((p) => (
//                   <li key={p.id} className="flex justify-between gap-4">
//                     <span>{p.name}</span>
//                     <span className="font-mono text-xs text-red-600">
//                       {p.stock} / min {p.reorder_point}
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             </CardContent>
//           </Card>
//           <Card className="rounded-xl border-teal-800 bg-teal-800 text-white shadow-sm">
//             <CardContent className="flex flex-col gap-2 p-5">
//               <Activity className="h-6 w-6" />
//               <p className="text-lg font-bold">Active rate</p>
//               <p className="text-3xl font-bold">98%</p>
//               <p className="text-xs text-teal-100">
//                 Healthy catalog coverage based on in-stock SKUs.
//               </p>
//             </CardContent>
//           </Card>
//         </div>
//       )}
//     </div>
//   );
// };


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