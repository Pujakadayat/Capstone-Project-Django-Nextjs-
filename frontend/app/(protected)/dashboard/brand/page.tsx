"use client";
import BrandManager from "@/components/brand/BrandManager";
import { getRole } from "@/lib/auth";

const BrandPage = () => {
  const role = getRole();
  return (
    <div className="max-w-2xl mx-auto py-10 px-4 ">
      {/* <BrandCreateForm /> */}
      {/* <BrandList /> */}
      <BrandManager role={role} />
    </div>
  );
};

export default BrandPage;
