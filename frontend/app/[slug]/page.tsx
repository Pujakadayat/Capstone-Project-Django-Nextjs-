import Add from "@/components/products/Add"
import CustomizeProducts from "@/components/products/CustomizeProducts"
import ProductImages from "@/components/products/ProductImages"

const SinglePage = () =>{

    return (
        <div className="px-4 md:px-8 lg:px-12 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
            <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
            <ProductImages />

            </div>
<div className="w-full lg:-1/2 flex flex-col gap-6">
<h1 className="text-4xl font-medium">Product Name</h1>
<p className="text-gray-500">
  Lorem Ipsum is simply dummy text of the printing and
   typesetting industry. Lorem Ipsum has been the industry's 
   standard dummy text ever since the 1500s, when an unknown 
   printer took a galley of type and scrambled it to make a 
   type specimen book. 
</p>
<div className="h-0.5 bg-gray-100" />
<div className="flex items-center gap-4">
  <h3 className="text-xl text-gray-500 line-through">Discounted Price</h3>
  <h3 className="font-medium text-2xl">Original Price</h3>
</div>
<div className="h-0.5 bg-gray-100" />
<CustomizeProducts variants={[]} />
<Add productId={""} variantId={""} stockNumber={0} />
<div className="h-0.5 bg-gray-100" />
<div className="text-sm">
  <h4 className="font-medium mb-4">Title</h4>
  <p>Descriotions   </p>
</div>

</div>
        </div>
    )
}

// "use client";

// import CustomizeProducts from "@/components/products/CustomizeProducts";
// import ProductImages from "@/components/products/ProductImages";
// import { useProductById } from "@/hooks/useProductById";
// import { useProductVariant } from "@/hooks/useProductVariant";
// import { getMediaUrl } from "@/lib/utils";
// import { useParams } from "next/navigation";

// const SinglePage = () => {
//   const params = useParams();
//   const id = params?.id as string;

//   const { data: product, isLoading, isError } = useProductById(id);
//   const { data: variantData } = useProductVariant(id);

//   const variants = variantData?.results ?? [];

//   if (isLoading) return <p>Loading...</p>;
//   if (isError || !product) return <p>Product not found</p>;

//   return (
//     <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex flex-col lg:flex-row gap-16">
//       {/* IMAGES */}
//       <div className="w-full lg:w-1/2 sticky top-20 h-max">
//         <ProductImages image={getMediaUrl(product.image)!} />
//       </div>

//       {/* DETAILS */}
//       <div className="w-full lg:w-1/2 flex flex-col gap-6">
//         <h1 className="text-3xl font-semibold">{product.name}</h1>

//         <p className="text-gray-500">{product.description}</p>

//         <div className="h-[1px] bg-gray-200" />

//         {/* PRICE */}
//         <h2 className="text-2xl font-medium">
//           Rs. {product.selling_price ?? "—"}
//         </h2>

//         <div className="h-[1px] bg-gray-200" />

//         {/* VARIANTS / ADD */}
//         {variants.length > 0 ? (
//           <CustomizeProducts variants={variants} />
//         ) : (
//           <Add
//             productId={product.id}
//             variantId={null}
//             stockNumber={product.stock ?? 0}
//           />
//         )}

//         <div className="h-[1px] bg-gray-200" />
//       </div>
//     </div>
//   );
// };

// export default SinglePage;
