import BrandList from "@/components/brand/BrandList";
import CategoryList from "@/components/category/CategoryList";
import Filter from "@/components/common/Filter";
import Slider from "@/components/common/Slider";
import ProductList from "@/components/products/ProductList";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <div className="">
      <Slider />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">Featured Products</h1>
        <Suspense fallback={<Skeleton />}>
          <ProductList />
        </Suspense>
      </div>
      <div>
        <Filter />
        {/* <h1 className="mt-12 text-xl font-semibold">Mouse for you!</h1> */}
      </div>
      <div className="mt-24">
        <h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12">
          Categories
        </h1>
        <Suspense fallback={<Skeleton />}>
          <CategoryList />
        </Suspense>
      </div>
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">Brands</h1>
        <Suspense fallback={<Skeleton />}>
          <BrandList />
        </Suspense>
      </div>
    </div>
  );
}
