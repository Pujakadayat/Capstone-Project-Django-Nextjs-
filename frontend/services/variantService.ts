import { VariationType, VariationValue } from "@/types/productvariant";
import api from "@/lib/api";

export const fetchVariantTypes = async (pageNumber: number) => {
  const res = await api.get(
    `api/v1/products/variant-type/?page=${pageNumber}`,
  );
  return res.data;
};

export const fetchVariantTypeById = async (id: string) => {
  const res = await api.get(`api/v1/products/variant-type/${id}/`);
  return res.data;
};

export const createVariantType = async (data: Partial<VariationType>) => {
  const res = await api.post(`api/v1/products/variant-type/`, data);
  return res.data;
};

export const updateVariantType = async (
  id: string,
  data: Partial<VariationType>,
) => {
  const res = await api.patch(`api/v1/products/variant-type/${id}/`, data);
  return res.data;
};

export const deleteVariantType = async (id: string) => {
  const res = await api.delete(`api/v1/products/variant-type/${id}/`);
  return res.data;
};

export const fetchVariantValues = async (pageNumber: number) => {
  const res = await api.get(
    `api/v1/products/variant-value/?page=${pageNumber}`,
  );
  return res.data;
};

export const fetchVariantValueById = async (id: string) => {
  const res = await api.get(`api/v1/products/variant-value/${id}/`);
  return res.data;
};

export const createVariantValue = async (data: Partial<VariationValue>) => {
  const res = await api.post(`api/v1/products/variant-value/`, data);
  return res.data;
};

export const updateVariantValue = async (
  id: string,
  data: Partial<VariationValue>,
) => {
  const res = await api.patch(`api/v1/products/variant-value/${id}/`, data);
  return res.data;
};

export const deleteVariantValue = async (id: string) => {
  const res = await api.delete(`api/v1/products/variant-value/${id}/`);
  return res.data;
};
