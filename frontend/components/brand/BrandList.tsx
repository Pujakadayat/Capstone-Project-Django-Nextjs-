// "use client";
// import Link from "next/link";
// import Image from "next/image";

// import { useBrand } from "@/hooks/usebrand";
// import { Brand } from "@/types/brand";
// import { getMediaUrl } from "@/lib/utils";
// const BrandList = () => {
//   const { data, isLoading, isError } = useBrand();

//   const brands: Brand[] = data?.results ?? [];
//   if (isError) {
//     return (
//       <p className="text-[12px] uppercase text-red-500 py-10">
//         Failed to load categories.
//       </p>
//     );
//   }

//   return (
//     <div className="px-4 overflow-x-scroll scrollbar-hide">
//       <div className="flex gap-4 md:gap-8">
//         {brands.map((brand) => (
//           <Link
//             href="/list?cat=test"
//             key={brand.id}
//             className="shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
//           >
//             <div className="relative bg-slate-100 w-full h-96 ">
//               {brand.logoimage ? (
//                 <Image
//                   src={`${process.env.NEXT_PUBLIC_API_URL}${brand.logoimage}`}
//                   alt={brand.name}
//                   fill
//                   sizes="20vw"
//                   className="object-cover"
//                 />
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center text-gray-500">
//                   No image found
//                 </div>
//               )}
//             </div>
//             <h1 className="mt-8 font-light text-xl tracking-wide">
//               {brand.name}
//             </h1>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BrandList;
"use client";

import Link from "next/link";
import Image from "next/image";
import { useBrand } from "@/hooks/usebrand";
import { Brand } from "@/types/brand";
import { getMediaUrl } from "@/lib/utils";

const BrandList = () => {
  const { data, isLoading, isError } = useBrand();

  const brands: Brand[] = data?.results ?? [];

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
        {brands.map((brand) => {
    
          const imageUrl = getMediaUrl(brand.logoimage);
          return (
            <Link
              href="/list?cat=test"
              key={brand.id}
              className="shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
            >
              <div className="relative bg-slate-100 w-full h-96">
                {brand.logoimage ? (
                  <Image
                    src={imageUrl!}
                    alt={brand.name}
                    unoptimized
                    fill
                    sizes="20vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    No image found
                  </div>
                )}
              </div>

              <h1 className="mt-8 font-light text-xl tracking-wide">
                {brand.name}
              </h1>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BrandList;
