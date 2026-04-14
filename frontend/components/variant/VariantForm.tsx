// "use client";

// import { useState } from "react";
// import { useProductVariant } from "@/hooks/useProductVariant";
// import { useVariantValue } from "@/hooks/useVariantValue";
// import { ProductVariant } from "@/types/productvariant";
// import { toast } from "sonner";

// interface Props {
//   initialData?: ProductVariant | null;
//   productname?: string; // If creating from a specific product page
//   onSuccess: () => void;
// }

// export const VariantForm = ({ initialData, productname, onSuccess }: Props) => {
//   const { createProductVariantdata, updateProductVariantdata } =
//     useProductVariant();
//   const { data: valData } = useVariantValue();
//   const allValues = valData?.results ?? [];

//   const [form, setForm] = useState({
//     product: initialData?.product || productname || "",
//     sku: initialData?.sku ?? "",
//     variation_ids: initialData?.variations.map((v) => v.id) ?? ([] as string[]),
//     cost_price: initialData?.cost_price ?? "",
//     selling_price: initialData?.selling_price ?? "",
//     stock: initialData?.stock ?? 0,
//   });

//   const isEditing = !!initialData;

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!form.product) return toast.error("Product ID is required");

//     const payload = {
//       ...form,
//       cost_price: form.cost_price ? Number(form.cost_price) : null,
//       selling_price: form.selling_price ? Number(form.selling_price) : null,
//     };

//     if (isEditing) {
//       updateProductVariantdata.mutate(
//         { id: initialData.id, data: payload as any },
//         {
//           onSuccess: () => {
//             toast.success("Variant Updated");
//             onSuccess();
//           },
//         },
//       );
//     } else {
//       createProductVariantdata.mutate(payload as any, {
//         onSuccess: () => {
//           toast.success("Variant Created");
//           onSuccess();
//         },
//       });
//     }
//   };

//   const inputClass =
//     "w-full px-3 py-2 border border-gray-300 text-sm rounded-none focus:border-black outline-none";
//   const labelClass =
//     "block text-[10px] font-bold uppercase text-gray-500 mb-1 mt-4";

//   return (
//     <form onSubmit={handleSubmit} className="space-y-2">
//       {!productname && !isEditing && (
//         <div>
//           <label className={labelClass}>Product ID</label>
//           <input
//             className={inputClass}
//             value={form.product}
//             onChange={(e) => setForm({ ...form, product: e.target.value })}
//             placeholder="Paste Product ID"
//           />
//         </div>
//       )}

//       <div>
//         <label className={labelClass}>Select Variations (Attributes)</label>
//         <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border p-2 border-gray-100">
//           {allValues.map((val) => (
//             <label
//               key={val.id}
//               className="flex items-center gap-2 text-[11px] cursor-pointer hover:bg-gray-50 p-1"
//             >
//               <input
//                 type="checkbox"
//                 checked={form.variation_ids.includes(val.id)}
//                 onChange={(e) => {
//                   const next = e.target.checked
//                     ? [...form.variation_ids, val.id]
//                     : form.variation_ids.filter((id) => id !== val.id);
//                   setForm({ ...form, variation_ids: next });
//                 }}
//               />
//               <span className="font-bold">{val.variation_type.name}:</span>{" "}
//               {val.value}
//             </label>
//           ))}
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className={labelClass}>Custom Cost Price</label>
//           <input
//             type="number"
//             step="0.01"
//             className={inputClass}
//             value={form.cost_price}
//             onChange={(e) => setForm({ ...form, cost_price: e.target.value })}
//             placeholder="Leave blank to inherit"
//           />
//         </div>
//         <div>
//           <label className={labelClass}>Custom Selling Price</label>
//           <input
//             type="number"
//             step="0.01"
//             className={inputClass}
//             value={form.selling_price}
//             onChange={(e) =>
//               setForm({ ...form, selling_price: e.target.value })
//             }
//             placeholder="Leave blank to inherit"
//           />
//         </div>
//       </div>

//       <div>
//         <label className={labelClass}>Stock Quantity</label>
//         <input
//           type="number"
//           className={inputClass}
//           value={form.stock}
//           onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
//         />
//       </div>

//       <button className="w-full mt-6 bg-black text-white py-2 text-xs font-bold uppercase hover:bg-gray-800 transition-colors">
//         {isEditing ? "Update Variant" : "Create Variant"}
//       </button>
//     </form>
//   );
// };

// "use client";

// import { useState } from "react";
// import { useProductVariant } from "@/hooks/useProductVariant";
// import { useVariantValue } from "@/hooks/useVariantValue";
// import { ProductVariant } from "@/types/productvariant";
// import { toast } from "sonner";

// interface Props {
//   initialData?: ProductVariant | null;
//   productname?: string; // If creating from a specific product page
//   onSuccess: () => void;
// }

// export const VariantForm = ({ initialData, productname, onSuccess }: Props) => {
//   const { createProductVariantdata, updateProductVariantdata } =
//     useProductVariant();
//   const { data: valData } = useVariantValue();
//   const allValues = valData?.results ?? [];

//   const [form, setForm] = useState({
//     product: initialData?.product || productname || "",
//     sku: initialData?.sku ?? "",
//     variation_ids: initialData?.variations.map((v) => v.id) ?? ([] as string[]),
//     cost_price: initialData?.cost_price ?? "",
//     selling_price: initialData?.selling_price ?? "",
//     stock: initialData?.stock ?? 0,
//   });

//   const isEditing = !!initialData;

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!form.product) return toast.error("Product ID is required");

//     const payload = {
//       ...form,
//       cost_price: form.cost_price ? Number(form.cost_price) : null,
//       selling_price: form.selling_price ? Number(form.selling_price) : null,
//     };

//     if (isEditing) {
//       updateProductVariantdata.mutate(
//         { id: initialData.id, data: payload as any },
//         {
//           onSuccess: () => {
//             toast.success("Variant Updated");
//             onSuccess();
//           },
//         },
//       );
//     } else {
//       createProductVariantdata.mutate(payload as any, {
//         onSuccess: () => {
//           toast.success("Variant Created");
//           onSuccess();
//         },
//       });
//     }
//   };

//   const inputClass =
//     "w-full px-3 py-2 border border-gray-300 text-sm rounded-none focus:border-black outline-none";
//   const labelClass =
//     "block text-[10px] font-bold uppercase text-gray-500 mb-1 mt-4";

//   return (
//     <form onSubmit={handleSubmit} className="space-y-2">
//       {!productname && !isEditing && (
//         <div>
//           <label className={labelClass}>Product Name</label>
//           {/* <input
//             className={inputClass}
//             value={form.product}
//             onChange={(e) => setForm({ ...form, product: e.target.value })}
//             placeholder="Paste Product ID"
//           /> */}
//           <select
//             multiple
//             value={form.product}
//             onChange={(e) => {
//               const selected = Array.from(e.target.selectedOptions).map(
//                 (o) => o.value,
//               );
//               setForm((f) => ({ ...form, productname: selected }));
//             }}
//             className={`${inputClass} h-28`}
//           >
//             {}
//           </select>
//         </div>
//       )}

//       <div>
//         <label className={labelClass}>Variantions</label>
//         <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border p-2 border-gray-100">
//           {allValues.map((val) => (
//             <label
//               key={val.id}
//               className="flex items-center gap-2 text-[11px] cursor-pointer hover:bg-gray-50 p-1"
//             >
//               <input
//                 type="checkbox"
//                 checked={form.variation_ids.includes(val.id)}
//                 onChange={(e) => {
//                   const next = e.target.checked
//                     ? [...form.variation_ids, val.id]
//                     : form.variation_ids.filter((id) => id !== val.id);
//                   setForm({ ...form, variation_ids: next });
//                 }}
//               />
//               <span className="font-bold">{val.variation_type.name}:</span>{" "}
//               {val.value}
//             </label>
//           ))}
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className={labelClass}>Custom Cost Price</label>
//           <input
//             type="number"
//             step="0.01"
//             className={inputClass}
//             value={form.cost_price}
//             onChange={(e) => setForm({ ...form, cost_price: e.target.value })}
//             placeholder="Leave blank to inherit"
//           />
//         </div>
//         <div>
//           <label className={labelClass}>Custom Selling Price</label>
//           <input
//             type="number"
//             step="0.01"
//             className={inputClass}
//             value={form.selling_price}
//             onChange={(e) =>
//               setForm({ ...form, selling_price: e.target.value })
//             }
//             placeholder="Leave blank to inherit"
//           />
//         </div>
//       </div>

//       <div>
//         <label className={labelClass}>Stock Quantity</label>
//         <input
//           type="number"
//           className={inputClass}
//           value={form.stock}
//           onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
//         />
//       </div>

//       <button className="w-full mt-6 bg-black text-white py-2 text-xs font-bold uppercase hover:bg-gray-800 transition-colors">
//         {isEditing ? "Update Variant" : "Create Variant"}
//       </button>
//     </form>
//   );
// };

"use client";

import { useState } from "react";
import { useProductVariant } from "@/hooks/useProductVariant";
import { useVariantValue } from "@/hooks/useVariantValue";
import { useVariantType } from "@/hooks/useVariantType";
import { ProductVariant } from "@/types/productvariant";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { useProductsForVariants } from "@/hooks/useProductById";

interface Props {
  initialData?: ProductVariant | null;
  onSuccess: () => void;
}

export const VariantForm = ({ initialData, onSuccess }: Props) => {
  const { createProductVariantdata } = useProductVariant();
  const { data: valData, createVariantValuedata } = useVariantValue();
  const { data: typeData, createVariantTypedata } = useVariantType();
  const { data: productsData } = useProductsForVariants();

  const allValues = valData?.results ?? [];
  const allTypes = typeData?.results ?? [];
  const allProducts = productsData?.results ?? [];

  const [newTypeName, setNewTypeName] = useState("");
  const [newValue, setNewValue] = useState({ typeId: "", text: "" });

  const [form, setForm] = useState({
    product: initialData?.product || "",
    sku: initialData?.sku ?? "",
    variation_ids: initialData?.variations.map((v) => v.id) ?? ([] as string[]),
    cost_price: initialData?.cost_price ?? "",
    selling_price: initialData?.selling_price ?? "",
    stock: initialData?.stock ?? 0,
  });

  const handleAddType = () => {
    if (!newTypeName) return toast.error("Enter a type name");
    createVariantTypedata.mutate(
      { name: newTypeName },
      {
        onSuccess: () => {
          toast.success("Type Created");
          setNewTypeName("");
        },
      },
    );
  };

  const handleAddValue = () => {
    if (!newValue.typeId || !newValue.text)
      return toast.error("Select type and enter value");
    createVariantValuedata.mutate(
      { variation_type: newValue.typeId as any, value: newValue.text },
      {
        onSuccess: () => {
          toast.success("Value Added");
          setNewValue({ ...newValue, text: "" });
        },
      },
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.product) return toast.error("Product is required");
    createProductVariantdata.mutate(form as any, {
      onSuccess: () => {
        toast.success("Variant Saved");
        onSuccess();
      },
    });
  };

  const inputClass =
    "w-full px-3 py-2 border border-gray-300 text-sm outline-none focus:border-black";
  const labelClass =
    "block text-[10px] font-bold uppercase text-gray-500 mb-1 mt-4";

  return (
    <div className="space-y-6 max-h-[80vh] overflow-y-auto px-1">
      {/* 1. Quick Add Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 border border-dashed border-gray-300">
        <div>
          <label className="text-[9px] font-black uppercase">
            Variation Type
          </label>
          <div className="flex mt-1">
            <input
              className={inputClass}
              placeholder="Size..."
              value={newTypeName}
              onChange={(e) => setNewTypeName(e.target.value)}
            />
            <button
              type="button"
              onClick={handleAddType}
              className="bg-black text-white p-2"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div>
          <label className="text-[9px] font-black uppercase">
            Variation Value
          </label>
          <div className="flex mt-1 gap-1">
            <select
              className="text-[10px] border border-gray-300 outline-none px-1"
              value={newValue.typeId}
              onChange={(e) =>
                setNewValue({ ...newValue, typeId: e.target.value })
              }
            >
              <option value="">Type</option>
              {allTypes.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
            <input
              className={inputClass}
              placeholder="XL..."
              value={newValue.text}
              onChange={(e) =>
                setNewValue({ ...newValue, text: e.target.value })
              }
            />
            <button
              type="button"
              onClick={handleAddValue}
              className="bg-black text-white p-2"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass}>Target Product (Eligible Only)</label>
          <select
            className={inputClass}
            value={form.product}
            onChange={(e) => setForm({ ...form, product: e.target.value })}
          >
            <option value="">-- Select --</option>
            {allProducts.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Select Attributes</label>
          <div className="grid grid-cols-2 gap-2 border-2 border-black p-3 bg-white max-h-40 overflow-y-auto">
            {allValues.map((val) => (
              <label
                key={val.id}
                className="flex items-center gap-2 text-[11px] border p-1 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={form.variation_ids.includes(val.id)}
                  onChange={(e) => {
                    const next = e.target.checked
                      ? [...form.variation_ids, val.id]
                      : form.variation_ids.filter((id) => id !== val.id);
                    setForm({ ...form, variation_ids: next });
                  }}
                />
                <span className="font-bold text-gray-400">
                  {val.variation_type?.name}:
                </span>
                <span className="font-black uppercase">{val.value}</span>
              </label>
            ))}
          </div>
        </div>

        <button className="w-full bg-black text-white py-4 font-bold uppercase text-xs">
          Create Product Variant
        </button>
      </form>
    </div>
  );
};
