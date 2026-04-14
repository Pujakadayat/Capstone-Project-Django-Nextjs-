"use client";
import {
  createProduct,
  deleteProduct,
  fetchProduct,
  updateProduct,
} from "@/services/productService";
import { Product } from "@/types/product";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";

export const useProduct = (categorySlug?: string) => {
  const queryClient = useQueryClient();
  const [pageNum, setpageNum] = useState(1);

  // const { data, isLoading, isError, error } = useQuery({
  //   queryKey: ["product", pageNum],
  //   queryFn: () => fetchProduct(pageNum),
  //   placeholderData: keepPreviousData,
  // });
  const { data, isLoading, isError, error } = useQuery({
    // Include categorySlug in queryKey so it refetches when category changes
    queryKey: ["product", pageNum, categorySlug],
    queryFn: () => fetchProduct(pageNum, categorySlug),
    placeholderData: keepPreviousData,
  });
  const createProductdata = useMutation({
    mutationFn: (data: FormData | Partial<Product>) => createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });
  const updateProductdata = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: FormData | Partial<Product>;
    }) => updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });
  const deleteProductdata = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });

  return {
    data,
    isLoading,
    isError,
    error,
    page: pageNum,
    setpageNum,
    updateProductdata,
    createProductdata,
    deleteProductdata,
  };
};
