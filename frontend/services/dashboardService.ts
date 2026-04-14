import api from "@/lib/api";

export const fetchDashboard = async () => {
  const res = await api.get(`api/v1/dashboard/`);
  return res.data;
};
