import React from "react";

const CustomizeProducts = () => {
  return (
    <div className="flex flex-col gap-6">
      <h4 className="font-medium">Choose a color</h4>
      <div className="flex items-center"></div>
      <h4 className="font-medium">Choose a size</h4>
      <ul className="flex items-center gap-3">
        <li className="w-8 h-8 rounded-full ring ring-gray-300 cursor-pointer relative bg-red-500">
          <div className="absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </li>
      </ul>
      <h4 className="font-medium">Choose a size</h4>
      <div className="flex items-center gap-3"></div>
    </div>
  );
};

export default CustomizeProducts;

// "use client";

// import { ProductVariant } from "@/types/productvariant";
// import { useState } from "react";

// const CustomizeProducts = ({ variants }: { variants: ProductVariant[] }) => {
//   const [selected, setSelected] = useState<string | null>(null);

//   return (
//     <div className="flex flex-col gap-4">
//       <h4 className="font-medium">Choose Variant</h4>

//       <div className="flex gap-2 flex-wrap">
//         {variants.map((v) => (
//           <button
//             key={v.id}
//             onClick={() => setSelected(v.id)}
//             className={`px-4 py-2 border rounded-md text-sm ${
//               selected === v.id
//                 ? "bg-black text-white"
//                 : "bg-white"
//             }`}
//           >
//             {v.variations.map((val) => val.value).join(" / ")}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CustomizeProducts;
