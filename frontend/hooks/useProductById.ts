"use client";

import { fetchProductById } from "@/services/productService";
import { fetchProductsForVariants } from "@/services/productvariantService";
import { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";

// export const useProductById = (id: string) =>
//   useQuery<Product>({
//     queryKey: ["product", id],
//     queryFn: () => fetchProductById(id),
//     enabled: !!id,
//   });
export const useProductsForVariants = () => {
  return useQuery({
    queryKey: ["products", "eligible-for-variants"],
    queryFn: fetchProductsForVariants,
    staleTime: 1000 * 60 * 5, 
  });
};