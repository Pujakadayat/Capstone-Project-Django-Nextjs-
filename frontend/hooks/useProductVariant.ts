"use client";

import { createProductVariant, deleteProductVariant, fetchProductVariant, updateProductVariant } from "@/services/productvariantService";
import { ProductVariant } from "@/types/productvariant";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";

export const useProductVariant = (productId: any) => {
  const queryClient = useQueryClient();
  const [pageNum, setpageNum] = useState(1);


  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["productvariant", pageNum],
    queryFn: () => fetchProductVariant(pageNum),
    placeholderData: keepPreviousData,
  });

  const createProductVariantdata = useMutation({
    mutationFn: (data: Partial<ProductVariant>) => createProductVariant(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productvariant"] });
    },
  });
  const updateProductVariantdata = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ProductVariant> }) =>
      updateProductVariant(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productvariant"] });
    },
  });
  const deleteProductVariantdata = useMutation({
    mutationFn: deleteProductVariant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productvariant"] });
    },
  });

  return {
    data,
    isLoading,
    isError,
    error,
    page: pageNum,
    setpageNum,
    updateProductVariantdata,
    createProductVariantdata,
    deleteProductVariantdata,
  };
};
