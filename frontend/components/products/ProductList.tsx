"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useProduct } from "@/hooks/useProduct";
import { Product } from "@/types/product";
import { envConfig } from "@/config/env";
import { getMediaUrl } from "@/lib/utils";

const ProductList = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("cat");
  const { data, isLoading, isError } = useProduct(category || undefined);

  const products: Product[] = data?.results ?? [];

  if (isLoading) {
    return (
      <div className="flex gap-x-8 gap-y-16 justify-between flex-wrap">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="w-full sm:w-[45%] lg:w-[22%]">
            <div className="w-full h-80 bg-gray-100 animate-pulse rounded-md" />
            <div className="mt-4 h-4 bg-gray-100 animate-pulse w-2/3" />
            <div className="mt-2 h-4 bg-gray-100 animate-pulse w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-[12px] uppercase text-red-500 py-10">
        Failed to load products.
      </p>
    );
  }

  if (products.length === 0) {
    return (
      <p className="text-sm text-gray-400 py-10 text-center">
        No products found.
      </p>
    );
  }

  return (
    <div className="flex gap-x-8 gap-y-10 justify-between flex-wrap">
      {products.map((pro) => {
        const imageUrl = getMediaUrl(pro.image);
        console.log("Product Image URL:", imageUrl);
        return (
          <Link
            key={pro.id}
            href={`/products/${pro.id}`}
            className="mt-12 w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
          >
            <div className="relative w-full h-80 bg-gray-50 rounded-md overflow-hidden">
              {pro.image ? (
                <Image
                  src={imageUrl!}
                  alt={pro.name}
                  fill
                  sizes="25vw"
                  unoptimized
                  className="object-cover hover:opacity-80 transition-opacity duration-500"
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

            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-400 uppercase">{pro.sku}</span>
              <span className="font-medium text-sm">{pro.name}</span>
              <span className="text-sm text-gray-500 line-clamp-2">
                {pro.description}
              </span>
              <span className="font-semibold mt-1">
                Rs. {pro.selling_price ?? "—"}
              </span>
            </div>

            <button
              className="w-max rounded-2xl ring-1 ring-black py-2 px-4 text-xs hover:bg-black hover:text-white transition-colors"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Add to cart
            </button>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductList;
