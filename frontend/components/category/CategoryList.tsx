"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { ProductCategory } from "@/types/category";
import { useCategory } from "@/hooks/useCategory";
import { getMediaUrl } from "@/lib/utils";
const CategoryList = () => {
  const { data, isLoading, isError } = useCategory();

  const category: ProductCategory[] = data?.results ?? [];
  if (isError) {
    return (
      <p className="text-[12px] uppercase text-red-500 py-10">
        Failed to load categories.
      </p>
    );
  }
  return (
    <div className="px-4 overflow-x-scroll scrollbar-hide">
      <div className="flex gap-4 md:gap-8">
        {category.map((cat) => (
          <Link
            key={cat.id}
            href={`/products?cat=${cat.slug}`}
            className="shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
          >
            <div className="relative bg-slate-100 w-full h-96 ">
              {cat.image ? (
                <Image
                  src={getMediaUrl(cat.image)!}
                  alt={cat.name}
                  fill
                  sizes="20vw"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-slate-100 flex-items-center justify-center text-gray-400 uppercase">
                  No Image
                </div>
              )}
            </div>
            <h1 className="mt-8 font-light text-xl tracking-wide">
              {cat.name}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
