"use client";

import { fetchVariantValues, createVariantValue, updateVariantValue, deleteVariantValue } from "@/services/variantService";
import {  VariationValue } from "@/types/productvariant";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";

export const useVariantValue = () => {
  const queryClient = useQueryClient();
  const [pageNum, setpageNum] = useState(1);


  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["varvalue", pageNum],
    queryFn: () => fetchVariantValues(pageNum),
    placeholderData: keepPreviousData,
  });

  const createVariantValuedata = useMutation({
    mutationFn: (data: Partial<VariationValue>) => createVariantValue(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["varvalue"] });
    },
  });
  const updateVariantValuedata = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<VariationValue> }) =>
      updateVariantValue(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["varvalue"] });
    },
  });
  const deleteVariantValuedata = useMutation({
    mutationFn: deleteVariantValue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["varvalue"] });
    },
  });

  return {
    data,
    isLoading,
    isError,
    error,
    page: pageNum,
    setpageNum,
    updateVariantValuedata,
    createVariantValuedata,
    deleteVariantValuedata,
  };
};
