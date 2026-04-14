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

// import { useDashboard } from "@/hooks/useDashboard";
// import { AdminDashboardData } from "@/types/dashboard";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   Legend,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useState } from "react";
// import { cn } from "@/lib/utils";

// type Range = "weekly" | "monthly";

// export default function OverviewChart() {
//   const { data, isLoading, isError } = useDashboard();
//   const [range, setRange] = useState<Range>("weekly");

//   if (isError) {
//     return (
//       <p className="text-sm font-medium text-red-600">
//         Chart could not be loaded.
//       </p>
//     );
//   }

//   if (isLoading || !data) {
//     return (
//       <div className="h-80 animate-pulse rounded-xl bg-slate-100" />
//     );
//   }

//   const chartdata: AdminDashboardData["charts"]["weekly_sales"] =
//     range === "weekly"
//       ? data.charts.weekly_sales
//       : data.charts.monthly_sales;

//   const formatted = chartdata.map((d) => ({
//     ...d,
//     label: d.date?.slice(5) ?? d.date,
//   }));

//   return (
//     <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
//       <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
//         <h2 className="text-base font-semibold text-slate-900">
//           Sales performance
//         </h2>
//         <div className="flex rounded-lg border border-slate-200 p-0.5 text-xs font-semibold">
//           <button
//             type="button"
//             className={cn(
//               "rounded-md px-3 py-1.5 transition",
//               range === "weekly"
//                 ? "bg-teal-700 text-white"
//                 : "text-slate-600 hover:bg-slate-50",
//             )}
//             onClick={() => setRange("weekly")}
//           >
//             Weekly
//           </button>
//           <button
//             type="button"
//             className={cn(
//               "rounded-md px-3 py-1.5 transition",
//               range === "monthly"
//                 ? "bg-teal-700 text-white"
//                 : "text-slate-600 hover:bg-slate-50",
//             )}
//             onClick={() => setRange("monthly")}
//           >
//             Monthly
//           </button>
//         </div>
//       </div>
//       <div className="h-72 md:h-80">
//         <ResponsiveContainer width="100%" height="100%">
//           <AreaChart data={formatted}>
//             <defs>
//               <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="0%" stopColor="#0f766e" stopOpacity={0.35} />
//                 <stop offset="100%" stopColor="#0f766e" stopOpacity={0} />
//               </linearGradient>
//             </defs>
//             <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
//             <XAxis
//               dataKey="label"
//               tick={{ fontSize: 11 }}
//               className="text-slate-500"
//             />
//             <YAxis
//               tick={{ fontSize: 11 }}
//               className="text-slate-500"
//               width={48}
//             />
//             <Tooltip
//               contentStyle={{
//                 borderRadius: 8,
//                 border: "1px solid #e2e8f0",
//                 fontSize: 12,
//               }}
//             />
//             <Legend wrapperStyle={{ fontSize: 12 }} />
//             <Area
//               type="monotone"
//               dataKey="revenue"
//               name="Revenue"
//               stroke="#0f766e"
//               fill="url(#rev)"
//               strokeWidth={2}
//             />
//           </AreaChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }
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