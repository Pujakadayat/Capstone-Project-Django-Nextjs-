"use client";

import {
  createBrand,
  deleteBrand,
  fetchBrands,
  updateBrand,
} from "@/services/brandService";
import { Brand } from "@/types/brand";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";

export const useBrand = () => {
  const queryClient = useQueryClient();
  const [pageNum, setpageNum] = useState(1);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["brands", pageNum],
    queryFn: () => fetchBrands(pageNum),
    placeholderData: keepPreviousData,
  });
  const createBranddata = useMutation({
    mutationFn: (data:FormData | Partial<Brand>) => createBrand(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
  const updateBranddata = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Brand> }) =>
      updateBrand(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
  const deleteBranddata = useMutation({
    mutationFn: deleteBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });

  return {
    data,
    isLoading,
    isError,
    error,
    page: pageNum,
    setpageNum,
    updateBranddata,
    createBranddata,
    deleteBranddata,
  };
};
