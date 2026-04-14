import { User } from "@/types/user";
import api from "@/lib/api";

export const fetchUsers = async (pageNumber: number) => {
  const res = await api.get(`api/v1/users/list/?page=${pageNumber}`);
  return res.data;
};

export const createUser = async (data: User) => {
  const res = await api.post(`api/v1/users/`, data);
  return res.data;
};

export const updateUser = async (id: string, data: Partial<User>) => {
  const res = await api.patch(`api/v1/users/${id}/`, data);
  return res.data;
};

export const deleteUser = async (id: string) => {
  const res = await api.delete(`api/v1/users/${id}/`, { data: null });
  return res.data;
};
