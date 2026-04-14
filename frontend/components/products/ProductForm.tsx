// // "use client";

// // import { User } from "@/types/user";
// // import { Label } from "../ui/label";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "../ui/select";
// // import { Input } from "../ui/input";
// // import { Card, CardContent, CardHeader } from "../ui/card";
// // import { Product } from "@/types/product";
// // import Image from "next/image";

// // export const EMPTY_PRODUCT_FORM = {
// //   name: "",
// //   sku: "",
// //   reorder_point: 5,
// //   images: null as File | null,
// //   description: "",
// //   stock: "",
// //   has_variant: "",
// //   cost_price: "",
// //   selling_price: "",
// //   brand: "",
// //   categories: "",
// //   total_stock: 0,
// //   is_low_stock: "",
// //   created_at: "",
// //   updated_at: "",
// // };

// // export type ProductForm = typeof EMPTY_PRODUCT_FORM;

// // interface ProductFormProps {
// //   form: ProductForm;
// //   setForm: (f: ProductForm) => void;
// //   products: Product[];
// //   categories: { id: string; name: string }[];
// // }

// // export const ProductForm = ({
// //   form,
// //   setForm,
// //   products,
// //   categories,
// // }: ProductFormProps) => {
// //   const inputClass =
// //     "w-full px-4 py-2 border border-gray-300 text-sm outline-none focus:border-black";
// //   const labelClass =
// //     "block text-xs font-bold uppercase text-gray-500 mb-1 mt-4";
// //   const error = "text-red-500 text-xs mt-1";

// //   return (
// //     <Card className="w-full max-w-md">
// //       <CardHeader> Add Product </CardHeader>
// //       <CardContent>
// //         <div className="grid gap-2">
// //           <Label className={labelClass}>Product Name</Label>
// //           <Input
// //             value={form.name ?? ""}
// //             onChange={(e) => setForm({ ...form, name: e.target.value })}
// //             className={inputClass}
// //             placeholder="e.g: mouse"
// //           />
// //         </div>
// //         <div className="grid gap-2">
// //           <Label className={labelClass}>Sku</Label>
// //           <Input
// //             value={form.sku}
// //             onChange={(e) => setForm({ ...form, sku: e.target.value })}
// //             className={inputClass}
// //             placeholder="e.g: 73264vg"
// //           />
// //         </div>
// //         <div className="grid gap-2">
// //           <Label className={labelClass}>Product Category</Label>
// //           <Select
// //             value={form.has_variant || "none"}
// //             onValueChange={(val) =>
// //               setForm({ ...form, has_variant: val === "none" ? "" : val })
// //             }
// //           >
// //             <SelectTrigger className="rounded-none border-black">
// //               <SelectValue placeholder="Select product category" />
// //             </SelectTrigger>
// //             <SelectContent className="rounded-none">
// //               <SelectItem value="none" disabled>
// //                 No Product found
// //               </SelectItem>
// //               {categories.map((cat) => (
// //                 <SelectItem key={cat.id} value={cat.id}>
// //                   {cat.name}
// //                 </SelectItem>
// //               ))}
// //             </SelectContent>
// //           </Select>
// //         </div>
// // <div className="grid gap-2">
// //   <Label className={labelClass}>Image</Label>

// //   <Input
// //     type="file"
// //     accept="image/*"
// //     onChange={(e) => {
// //       const file = e.target.files?.[0] || null;
// //       setForm({ ...form, image: file });
// //     }}
// //     className={inputClass}
// //   />

// //   {/* Preview */}
// //   {form.image && (
// //     <Image
// //       src={URL.createObjectURL(form.image)}
// //       alt="preview"
// //       width={60}
// //       height={60}
// //       className="mt-2"
// //     />
// //   )}
// // </div>
// //         <div className="grid gap-2">
// //           <Label className={labelClass}>Total Stock</Label>
// //           <Input
// //             type="number"
// //             value={form.total_stock}
// //             onChange={(e) =>
// //               setForm({ ...form, total_stock: Number(e.target.value) })
// //             }
// //             className={inputClass}
// //             placeholder="e.g: 1"
// //           />
// //         </div>
// //         <div className="grid gap-2">
// //           <Label className={labelClass}>Low Stock</Label>
// //           <Input
// //             type="number"
// //             value={form.is_low_stock}
// //             onChange={(e) => setForm({ ...form, is_low_stock: e.target.value })}
// //             className={inputClass}
// //             placeholder=""
// //           />
// //         </div>
// //         <div className="grid gap-2">
// //           <Label className={labelClass}>Created Date</Label>
// //           <Input
// //             type="date"
// //             value={form.created_at}
// //             onChange={(e) => setForm({ ...form, created_at: e.target.value })}
// //             className={inputClass}
// //           />
// //         </div>
// //       </CardContent>
// //     </Card>
// //   );
// // };
// // components/products/ProductForm.tsx
// "use client";

// import { User } from "@/types/user";
// import { Label } from "../ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";
// import { Input } from "../ui/input";
// import { Card, CardContent, CardHeader } from "../ui/card";
// import { Product } from "@/types/product";
// import Image from "next/image";

// export const EMPTY_PRODUCT_FORM = {
//   name: "",
//   sku: "",
//   reorder_point: 5,
//   image: null as File | null, // Fixed: was "images", now "image"
//   description: "",
//   stock: "",
//   has_variant: "",
//   cost_price: "",
//   selling_price: "",
//   brand: "",
//   categories: "",
//   total_stock: 0,
//   is_low_stock: "",
//   created_at: "",
//   updated_at: "",
// };

// export type ProductForm = typeof EMPTY_PRODUCT_FORM;

// interface ProductFormProps {
//   form: ProductForm;
//   setForm: (f: ProductForm) => void;
//   products: Product[];
//   categories: { id: string; name: string }[];
// }

// export const ProductForm = ({
//   form,
//   setForm,
//   products,
//   categories,
// }: ProductFormProps) => {
//   const inputClass =
//     "w-full px-4 py-2 border border-gray-300 text-sm outline-none focus:border-black";
//   const labelClass =
//     "block text-xs font-bold uppercase text-gray-500 mb-1 mt-4";
//   const error = "text-red-500 text-xs mt-1";

//   return (
//     <Card className="w-full max-w-md">
//       <CardHeader>Add Product</CardHeader>
//       <CardContent>
//         <div className="grid gap-2">
//           <Label className={labelClass}>Product Name</Label>
//           <Input
//             value={form.name ?? ""}
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//             className={inputClass}
//             placeholder="e.g: mouse"
//           />
//         </div>

//         <div className="grid gap-2">
//           <Label className={labelClass}>SKU</Label>
//           <Input
//             value={form.sku}
//             onChange={(e) => setForm({ ...form, sku: e.target.value })}
//             className={inputClass}
//             placeholder="e.g: 73264vg"
//           />
//         </div>

//         <div className="grid gap-2">
//           <Label className={labelClass}>Product Category</Label>
//           <Select
//             value={form.has_variant || "none"}
//             onValueChange={(val) =>
//               setForm({ ...form, has_variant: val === "none" ? "" : val })
//             }
//           >
//             <SelectTrigger className="rounded-none border-black">
//               <SelectValue placeholder="Select product category" />
//             </SelectTrigger>
//             <SelectContent className="rounded-none">
//               <SelectItem value="none" disabled>
//                 No Product found
//               </SelectItem>
//               {categories.map((cat) => (
//                 <SelectItem key={cat.id} value={cat.id}>
//                   {cat.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="grid gap-2">
//           <Label className={labelClass}>Product Description</Label>
//           <Input
//             value={form.description}
//             onChange={(e) => setForm({ ...form, description: e.target.value })}
//             className={inputClass}
//             placeholder="e.g: High-quality wireless mouse"
//           />
//         </div>

//         <div className="grid gap-2">
//           <Label className={labelClass}>Cost Price</Label>
//           <Input
//             type="number"
//             value={form.cost_price}
//             onChange={(e) => setForm({ ...form, cost_price: e.target.value })}
//             className={inputClass}
//             placeholder="e.g: 500"
//           />
//         </div>

//         <div className="grid gap-2">
//           <Label className={labelClass}>Selling Price</Label>
//           <Input
//             type="number"
//             value={form.selling_price}
//             onChange={(e) =>
//               setForm({ ...form, selling_price: e.target.value })
//             }
//             className={inputClass}
//             placeholder="e.g: 800"
//           />
//         </div>

//         <div className="grid gap-2">
//           <Label className={labelClass}>Image</Label>
//           <Input
//             type="file"
//             accept="image/*"
//             onChange={(e) => {
//               const file = e.target.files?.[0] || null;
//               setForm({ ...form, image: file });
//             }}
//             className={inputClass}
//           />

//           {/* Preview */}
//           {form.image && (
//             <Image
//               src={URL.createObjectURL(form.image)}
//               alt="preview"
//               width={60}
//               height={60}
//               className="mt-2"
//             />
//           )}
//         </div>

//         <div className="grid gap-2">
//           <Label className={labelClass}>Total Stock</Label>
//           <Input
//             type="number"
//             value={form.total_stock}
//             onChange={(e) =>
//               setForm({ ...form, total_stock: Number(e.target.value) })
//             }
//             className={inputClass}
//             placeholder="e.g: 100"
//           />
//         </div>

//         <div className="grid gap-2">
//           <Label className={labelClass}>Reorder Point</Label>
//           <Input
//             type="number"
//             value={form.reorder_point}
//             onChange={(e) =>
//               setForm({ ...form, reorder_point: Number(e.target.value) })
//             }
//             className={inputClass}
//             placeholder="e.g: 5"
//           />
//         </div>

//         <div className="grid gap-2">
//           <Label className={labelClass}>Created Date</Label>
//           <Input
//             type="date"
//             value={form.created_at}
//             onChange={(e) => setForm({ ...form, created_at: e.target.value })}
//             className={inputClass}
//           />
//         </div>

//         <button className="w-full mt-6 px-4 py-2 bg-black text-white text-sm font-bold hover:bg-gray-800">
//           Add Product
//         </button>
//       </CardContent>
//     </Card>
//   );
// };

"use client";

import { useProduct } from "@/hooks/useProduct";
import { useCategory } from "@/hooks/useCategory";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { useBrand } from "@/hooks/usebrand";
import { Brand } from "@/types/brand";

export const EMPTY_PRODUCT_FORM = {
  name: "",
  sku: "",
  reorder_point: 5,
  image: null as File | null,
  description: "",
  stock: 0,
  has_variant: false,
  cost_price: "",
  selling_price: "",
  brand: [] as string[],
  categories: [] as string[],
};

type ProductFormState = typeof EMPTY_PRODUCT_FORM;

interface ProductFormProps {
  onSuccess?: () => void;
  initialData?: Partial<ProductFormState>;
  productId?: string;
}

export const ProductForm = ({
  onSuccess,
  initialData,
  productId,
}: ProductFormProps) => {
  const { createProductdata, updateProductdata } = useProduct();
  const { data: categoryData } = useCategory();
  const categories = categoryData?.results ?? [];
  const { data: branddata } = useBrand();
  const brand = branddata?.results ?? [];

  const [form, setForm] = useState<ProductFormState>({
    ...EMPTY_PRODUCT_FORM,
    ...initialData,
  });
  const [preview, setPreview] = useState<string | null>(null);

  const isEditing = !!productId;
  const isPending = isEditing
    ? updateProductdata.isPending
    : createProductdata.isPending;

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0] ?? null;
  //   setForm((f) => ({ ...f, image: file }));
  //   if (file) {
  //     // Revoke old object URL to prevent memory leak
  //     if (preview) URL.revokeObjectURL(preview);
  //     setPreview(URL.createObjectURL(file));
  //   }
  // };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("sku", form.sku);
    fd.append("description", form.description);
    fd.append("stock", String(form.stock));
    fd.append("reorder_point", String(form.reorder_point));
    fd.append("has_variant", String(form.has_variant));
    if (form.cost_price) fd.append("cost_price", form.cost_price);
    if (form.selling_price) fd.append("selling_price", form.selling_price);
    if (form.image) fd.append("image", form.image);
    form.categories.forEach((id) => fd.append("categories", id));
    form.brand.forEach((id) => fd.append("brand", id));

    if (isEditing) {
      updateProductdata.mutate(
        { id: productId, data: fd },
        {
          onSuccess: () => {
            toast.success("Product updated.");
            onSuccess?.();
          },
          onError: () => toast.error("Failed to update product."),
        },
      );
    } else {
      createProductdata.mutate(fd, {
        onSuccess: () => {
          toast.success("Product created.");
          setForm(EMPTY_PRODUCT_FORM);
          setPreview(null);
          onSuccess?.();
        },
        onError: (err: any) => {
          const msg =
            err?.response?.data?.sku?.[0] ?? "Failed to create product.";
          toast.error(msg);
        },
      });
    }
  };

  const inputClass =
    "w-full px-4 py-2 border border-gray-300 text-sm outline-none focus:border-black rounded-none";
  const labelClass =
    "block text-xs font-bold uppercase text-gray-500 mb-1 mt-4";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-1">
      <div>
        <label className={labelClass}>Product name *</label>
        <input
          required
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className={inputClass}
          placeholder="e.g. iPhone 15 Case"
        />
      </div>

      <div>
        <label className={labelClass}>SKU *</label>
        <input
          required
          value={form.sku}
          onChange={(e) => setForm((f) => ({ ...f, sku: e.target.value }))}
          className={inputClass}
          placeholder="e.g. CASE-IP15-001"
        />
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea
          value={form.description}
          onChange={(e) =>
            setForm((f) => ({ ...f, description: e.target.value }))
          }
          className={inputClass}
          rows={3}
          placeholder="Product description"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Cost price *</label>
          <input
            type="number"
            min={0}
            step="0.01"
            value={form.cost_price}
            onChange={(e) =>
              setForm((f) => ({ ...f, cost_price: e.target.value }))
            }
            className={inputClass}
            placeholder="e.g. 900"
          />
        </div>
        <div>
          <label className={labelClass}>Selling price *</label>
          <input
            type="number"
            min={0}
            step="0.01"
            value={form.selling_price}
            onChange={(e) =>
              setForm((f) => ({ ...f, selling_price: e.target.value }))
            }
            className={inputClass}
            placeholder="e.g. 1200"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Stock</label>
          <input
            type="number"
            min={0}
            value={form.stock}
            onChange={(e) =>
              setForm((f) => ({ ...f, stock: Number(e.target.value) }))
            }
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Reorder point</label>
          <input
            type="number"
            min={0}
            value={form.reorder_point}
            onChange={(e) =>
              setForm((f) => ({ ...f, reorder_point: Number(e.target.value) }))
            }
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Has variants?</label>
        <select
          value={String(form.has_variant)}
          onChange={(e) =>
            setForm((f) => ({ ...f, has_variant: e.target.value === "true" }))
          }
          className={inputClass}
        >
          <option value="false">No — simple product</option>
          <option value="true">Yes — has color/model/size variants</option>
        </select>
      </div>

      <div>
        <label className={labelClass}>Category</label>
        <select
          multiple
          value={form.categories}
          onChange={(e) => {
            const selected = Array.from(e.target.selectedOptions).map(
              (o) => o.value,
            );
            setForm((f) => ({ ...f, categories: selected }));
          }}
          className={`${inputClass} h-28`}
        >
          {categories.map((cat: any) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <p className="text-[10px] text-gray-400 mt-1">
          Hold Ctrl/Cmd to select multiple
        </p>
      </div>
      <div>
        <label className={labelClass}> Brand</label>
        <select
          multiple
          value={form.brand}
          onChange={(e) => {
            const selected = Array.from(e.target.selectedOptions).map(
              (o) => o.value,
            );
            setForm((f) => ({ ...f, brand: selected }));
          }}
          className={`${inputClass} h-28`}
        >
          {brand.map((b: Partial<Brand>) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className={inputClass}
        />
        {preview && (
          <Image
            src={preview}
            alt="preview"
            width={80}
            height={80}
            className="mt-2 object-cover rounded"
            unoptimized
          />
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full mt-6 px-4 py-2 bg-black text-white text-sm font-bold hover:bg-gray-800 disabled:opacity-50 transition-colors"
      >
        {isPending
          ? isEditing
            ? "Saving…"
            : "Creating…"
          : isEditing
            ? "Save changes"
            : "Add product"}
      </button>
    </form>
  );
};
