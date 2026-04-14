// // import {
// //   CategoryForm,
// //   EMPTY_CATEGORY_FORM,
// // } from "@/components/category/CategoryForm";
// import CategoryList from "@/components/category/CategoryList";
// import CategoryManager from "@/components/category/CategoryManager";
// import { getRole } from "@/lib/auth";
// import { useState } from "react";

// const CategoryPage = () => {
//   // const [form, setForm] = useState(EMPTY_CATEGORY_FORM);
//   const role = getRole();
//   return (
//     <div>
//       {/* <CategoryList /> */}
//       {/* <CategoryForm form={form} setForm={setForm} categories={[]} /> */}
//       <CategoryManager role={role} />
//     </div>
//   );
// };

// export default CategoryPage;
"use client";
import CategoryManager from "@/components/category/CategoryManager";
import { getRole } from "@/lib/auth";

const CategoryPage = () => {
  const role = getRole();
  return (
    <div className="max-w-2xl mx-auto py-10 px-4 ">
      {/* <BrandCreateForm /> */}
      {/* <BrandList /> */}
      <CategoryManager role={role} />
    </div>
  );
};

export default CategoryPage;
