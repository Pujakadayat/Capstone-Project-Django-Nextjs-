// import ProductManager from "@/components/products/ProductManager";

// import { getRole } from "@/lib/auth";

// const ProductPage = () => {
//   const role = getRole();
//   console.log("Role:", role);

//   return (
//     <div className="max-w-2xl mx-auto py-10 px-4 ">
//       {/* <ProductCreateForm /> */}
//       {/* <ProductList /> */}
//       <ProductManager role={role} />
//     </div>
//   );
// };

// export default ProductPage;

"use client";
import ProductManager from "@/components/products/ProductManager";
import { getRole } from "@/lib/auth";
import { Role } from "@/types/user";

const ProductPage = () => {
  const role = getRole();
  console.log("ROle:", role);
  if (!role) return null;
  return (
    <div className="py-10 px-4">
      <ProductManager role={role as Role} />
    </div>
  );
};

export default ProductPage;
