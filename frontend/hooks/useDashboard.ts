import { fetchDashboard } from "@/services/dashboardService";
import { AdminDashboardData } from "@/types/dashboard";
import { useQuery } from "@tanstack/react-query";

export const useDashboard = () => {
  const { data, isLoading, isError, error } = useQuery<AdminDashboardData>({
    queryKey: ["dashboard"],
    queryFn: fetchDashboard,
  });
  return { data, isLoading, isError, error };
};
