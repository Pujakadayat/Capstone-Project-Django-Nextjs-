import { Brand } from "@/types/brand";
import api from "@/lib/api";

export const fetchBrands = async (pageNumber: number) => {
  const res = await api.get(`api/v1/products/brand/?page=${pageNumber}`);
  return res.data;
};

export const fetchBrandById = async (id: string) => {
  const res = await api.get(`api/v1/products/brand/${id}/`);
  return res.data;
};

export const createBrand = async (data: FormData | Partial<Brand>) => {
  const res = await api.post(`api/v1/products/brand/`, data);
  return res.data;
};

export const updateBrand = async (id: string, data: Partial<Brand>) => {
  const res = await api.patch(`api/v1/products/brand/${id}/`, data);
  return res.data;
};

export const deleteBrand = async (id: string) => {
  const res = await api.delete(`api/v1/products/brand/${id}/`);
  return res.data;
};
