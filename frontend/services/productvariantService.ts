
import { ProductVariant } from "@/types/productvariant";
import api from "@/lib/api";


export const fetchProductsForVariants = async () => {
  const res = await api.get(`api/v1/products/?has_variant=true`);
  return res.data;
};
export const fetchProductVariant = async (pageNumber: number) => {
  const res = await api.get(`api/v1/products/variants/?page=${pageNumber}`);
  return res.data;
};

export const fetchVariantsByProductId = async (productId: string) => {
  const res = await api.get(
    `api/v1/products/variants/?product=${productId}&page_size=50`,
  );
  return res.data;
};

export const fetchProductVariantById = async (id: string) => {
  const res = await api.get(`api/v1/products/variants/${id}/`);
  return res.data;
};

export const updateProductVariant = async (id: string, data: Partial<ProductVariant>) => {
  const res = await api.patch(`api/v1/products/variants/${id}/`, data);
  return res.data;
};

export const createProductVariant = async (data: Partial<ProductVariant>) => {
  const res = await api.post(`api/v1/products/variants/`, data);
  return res.data;
};

export const deleteProductVariant = async (id: string) => {
  const res = await api.delete(`api/v1/products/variants/${id}/`);
  return res.data;
};


