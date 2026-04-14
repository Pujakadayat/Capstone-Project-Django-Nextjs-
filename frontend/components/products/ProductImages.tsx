"use client";
import { useProduct } from "@/hooks/useProduct";
import { getMediaUrl } from "@/lib/utils";
import { Product } from "@/types/product";
import Image from "next/image";
import { useState } from "react";

const ProductImages = () => {
  const [index, setIndex] = useState(0);
  const { data, isLoading, isError } = useProduct();

  const products: Product[] = data?.results ?? [];
  return (
    <div>
      <div className="h-125 relative">
        <div className="flex justify-between gap-4 mt-8">
          {products.map((pro, index) => {
            const imageUrl = getMediaUrl(pro.image);
            return (
              <div
                className="w-1/4 h-32 relative gap-4 mt-8 cursor-pointer"
                key={pro.id}
                onClick={() => setIndex(index)}
              >
                <img
                  src={imageUrl || "hello"}
                  alt={pro.name}
                  // fill
                  // unoptimized
                  sizes="30vw"
                  className="object-cover rounded-md"
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className=""></div>
    </div>
  );
};

export default ProductImages;
// "use client";

// import Image from "next/image";

// const ProductImages = ({ image }: { image?: string }) => {
//   return (
//     <div>
//       <div className="relative w-full h-[500px] bg-gray-100 rounded-md overflow-hidden">
//         {image ? (
//           <Image
//             src={image}
//             alt="product"
//             fill
//             className="object-cover"
//           />
//         ) : (
//           <div className="flex items-center justify-center h-full text-gray-400">
//             No Image
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductImages;
