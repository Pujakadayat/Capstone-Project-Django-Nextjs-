
import { ProductCategory } from "@/types/category";
import api from "@/lib/api";



export const createCategories = async (data: FormData | Partial<ProductCategory>) => {
  const res = await api.post(`api/v1/products/categories/`, data);
  return res.data;
};
export const fetchCategories = async (pageNumber:number) => {
  const res = await api.get(`api/v1/products/categories/?page=${pageNumber}`);
  return res.data;
};

export const fetchCategoryById = async (id: string) => {
  const res = await api.get(`api/v1/products/categories/${id}/`);
  return res.data;
};

export const updateCategory = async (id: string, data: FormData | Partial<ProductCategory>) => {
  const res = await api.patch(`api/v1/products/categories/${id}/`, data);
  return res.data;
};

export const deleteCategory = async (id: string) => {
  const res = await api.delete(`api/v1/products/categories/${id}/`);
  return res.data;
};



