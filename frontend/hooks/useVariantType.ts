"use client";

import { createVariantType, deleteVariantType, fetchVariantTypes, updateVariantType } from "@/services/variantService";
import { VariationType } from "@/types/productvariant";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";

export const useVariantType = () => {
  const queryClient = useQueryClient();
  const [pageNum, setpageNum] = useState(1);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["vartype", pageNum],
    queryFn: () => fetchVariantTypes(pageNum),
    placeholderData: keepPreviousData,
  });

  const createVariantTypedata = useMutation({
    mutationFn: (data: Partial<VariationType>) => createVariantType(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vartype"] });
    },
  });
  const updateVariantTypedata = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<VariationType> }) =>
      updateVariantType(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vartype"] });
    },
  });
  const deleteVariantTypedata = useMutation({
    mutationFn: deleteVariantType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vartype"] });
    },
  });

  return {
    data,
    isLoading,
    isError,
    error,
    page: pageNum,
    setpageNum,
    updateVariantTypedata,
    createVariantTypedata,
    deleteVariantTypedata,
  };
};
