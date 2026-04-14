"use client";

import {
  createCategories,
  deleteCategory,
  fetchCategories,
  updateCategory,
} from "@/services/categoryService";
import { ProductCategory } from "@/types/category";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";

export const useCategory = () => {
  const queryClient = useQueryClient();
  const [pageNum, setpageNum] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["category", pageNum],
    queryFn: () => fetchCategories(pageNum),
    placeholderData: keepPreviousData,
  });

  const createCategorydata = useMutation({
    mutationFn: (data: FormData | Partial<ProductCategory>) =>
      createCategories(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });
  const updateCategorydata = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: FormData | Partial<ProductCategory>;
    }) => updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });
  const deleteCategorydata = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });

  return {
    data,
    isLoading,
    isError,
    error,
    page: pageNum,
    setpageNum,
    updateCategorydata,
    createCategorydata,
    deleteCategorydata,
  };
};
