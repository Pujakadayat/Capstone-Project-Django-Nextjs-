"use client";

import { useProduct } from "@/hooks/useProduct";
import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

export default function CustomerView() {
  const { data, isLoading, isError } = useProduct();
  const products: Product[] = data?.results ?? [];

  if (isLoading)
    return (
      <div className="px-4 md:px-8 lg:px-16 xl:px-32 py-8">
        <div className="flex gap-x-8 gap-y-16 flex-wrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="w-full sm:w-[45%] lg:w-[22%]">
              <div className="w-full h-80 bg-gray-100 animate-pulse rounded-md" />
              <div className="mt-4 h-4 bg-gray-100 animate-pulse w-2/3" />
              <div className="mt-2 h-4 bg-gray-100 animate-pulse w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );

  if (isError)
    return (
      <p className="text-[12px] uppercase text-red-500 py-10 text-center">
        Failed to load products.
      </p>
    );

  if (products.length === 0)
    return (
      <p className="text-sm text-gray-400 py-10 text-center">
        No products found.
      </p>
    );

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 py-8">
      <h1 className="text-2xl font-bold mb-8">Products</h1>
      <div className="flex gap-x-8 gap-y-16 flex-wrap">
        {products.map((pro) => (
          <div
            key={pro.id}
            className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
          >
            <Link href={`/products/${pro.id}`} className="block">
              <div className="relative w-full h-80 bg-gray-50 rounded-md overflow-hidden">
                {pro.image ? (
                  <Image
                    src={pro.image}
                    alt={pro.name}
                    fill
                    sizes="25vw"
                    className="object-cover hover:opacity-80 transition-opacity duration-500"
                    unoptimized={
                      typeof pro.image === "string" &&
                      (pro.image.includes("localhost") ||
                        pro.image.includes("127.0.0.1"))
                    }
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                    No image
                  </div>
                )}
                {pro.is_low_stock && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-2 py-0.5 uppercase font-bold">
                    Low stock
                  </span>
                )}
              </div>
            </Link>
            <div className="flex flex-col gap-1">
              <Link href={`/products/${pro.id}`}>
                <span className="text-xs text-gray-400 uppercase">{pro.sku}</span>
                <span className="font-medium text-sm block hover:underline">
                  {pro.name}
                </span>
              </Link>
              <span className="text-sm text-gray-500 line-clamp-2">
                {pro.description}
              </span>
              <span className="font-semibold mt-1">
                Rs. {pro.selling_price ?? "—"}
              </span>
            </div>
            <Link
              href={`/products/${pro.id}`}
              className="w-max rounded-2xl ring-1 ring-black py-2 px-4 text-xs hover:bg-black hover:text-white transition-colors text-center"
            >
              View details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
