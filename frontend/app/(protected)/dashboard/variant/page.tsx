"use client";
import VariantManager from "@/components/variant/VariantManger";
import { getRole } from "@/lib/auth";

const VariantPage = () => {
  const role = getRole();
  return (
    <div className="max-w-2xl mx-auto py-10 px-4 ">
      {/* <ProductCreateForm /> */}
      {/* <ProductList /> */}
      <VariantManager role={role} />
    </div>
  );
};

export default VariantPage;
