import api from "@/lib/api";
import { Product } from "@/types/product";

// export const fetchProduct = async (pageNumber: number) => {
//   const res = await api.get(`api/v1/products/?page=${pageNumber}`);
//   return res.data;
// };
export const fetchProduct = async (pageNumber: number, category?: string) => {
  // Build the query string dynamically
  let url = `api/v1/products/?page=${pageNumber}`;
  if (category) {
    url += `&categories__slug=${category}`;
  }
  
  const res = await api.get(url);
  return res.data;
};
export const fetchProductById = async (id: string) => {
  const res = await api.get(`api/v1/products/${id}/`);
  return res.data;
};

export const updateProduct = async (
  id: string,
  data: FormData | Partial<Product>,
) => {
  const res = await api.patch(`api/v1/products/${id}/`, data);
  return res.data;
};

export const createProduct = async (data: FormData | Partial<Product>) => {
  const res = await api.post(`api/v1/products/`, data);
  return res.data;
};

export const deleteProduct = async (id: string) => {
  const res = await api.delete(`api/v1/products/${id}/`);
  return res.data;
};
