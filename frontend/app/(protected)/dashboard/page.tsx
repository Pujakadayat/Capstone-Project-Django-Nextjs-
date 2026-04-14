"use client";
import AdminDashboard from "@/components/dashboard/Admin/AdminDashboard";
import { getRole } from "@/lib/auth";

import { Role } from "@/types/user";

export default function Dashboardpage() {
  const role = getRole();
  const renderDashboard = () => {
    if (role === Role.ADMIN) {
      return <AdminDashboard />;
    }
  };
  return <div>{renderDashboard()}</div>;
}
