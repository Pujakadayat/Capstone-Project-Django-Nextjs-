// "use client";

// import { User } from "@/types/user";
// import { Label } from "../ui/label";

// import { Input } from "../ui/input";
// import { ProductCategory } from "@/types/category";
// import { Card, CardContent, CardHeader } from "../ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";
// import { useCategory } from "@/hooks/useCategory";
// import { toast } from "sonner";

// export const EMPTY_CATEGORY_FORM = {
//   name: "",
//   slug: "",
//   image: null as File | null,
//   sort_order: 0,
//   parent: "",
//   created_at: "",
//   updated_at: "",
// };

// export type CategoryForm = typeof EMPTY_CATEGORY_FORM;

// interface CategoryFormProps {
//   onSuccess?: () => void;
//   form: CategoryForm;
//   setForm: (f: CategoryForm) => void;
//   category: ProductCategory[];
// }

// export const CategoryForm = ({
//   onSuccess,
//   form,
//   setForm,
//   category,
// }: CategoryFormProps) => {
//   const { createCategorydata, updateCategorydata } = useCategory();

//   const isEditing = !!category;
//   const isPending = isEditing
//     ? updateCategorydata.isPending
//     : createCategorydata.isPending;
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const fd = new FormData();
//     fd.append("name", form.name);
//     fd.append("slug", form.slug);
//     fd.append("parent", form.parent);
//     fd.append("sort_order", String(form.sort_order));

//     if (isEditing) {
//       updateCategorydata.mutate(
//         { cat: category, data: fd as any },
//         {
//           onSuccess: () => {
//             toast.success("Category Updated");
//             onSuccess?.();
//           },
//           onError: () => toast.error("Failed to update category."),
//         },
//       );
//     } else {
//       createCategorydata.mutate(fd as any, {
//         onSuccess: () => {
//           toast.success("Category created");
//           setForm(EMPTY_CATEGORY_FORM);
//           onSuccess?.();
//         },
//         onError: (err: any) => {
//           const msg =
//             err?.response?.data?.sku?.[0] ?? "Failed to create category.";
//           toast.error(msg);
//         },
//       });
//     }
//   };

//   const inputClass =
//     "w-full px-4 py-2 border border-gray-300 text-sm outline-none focus:border-black";
//   const labelClass =
//     "block text-xs font-bold uppercase text-gray-500 mb-1 mt-4";
//   const error = "text-red-500 text-xs mt-1";

//   return (
//     <Card className="w-full max-w-md">
//       <CardHeader> Add Product Category</CardHeader>
//       <CardContent>
//         <div className="grid gap-2">
//           <Label className={labelClass}>Category Name</Label>
//           <Input
//             value={form.name ?? ""}
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//             className={inputClass}
//             placeholder="e.g: Electronics"
//           />
//         </div>
//         <div className="grid gap-2">
//           <Label className={labelClass}>Slug</Label>
//           <Input
//             value={form.slug}
//             onChange={(e) => setForm({ ...form, slug: e.target.value })}
//             className={inputClass}
//             placeholder="e.g: 73264vg"
//           />
//         </div>
//         <div className="grid gap-2">
//           <Label className={labelClass}>Product Category</Label>
//           <Select
//             value={form.parent || "none"}
//             onValueChange={(val) =>
//               setForm({ ...form, parent: val === "none" ? "" : val })
//             }
//           >
//             <SelectTrigger className="rounded-none border-black">
//               <SelectValue placeholder="Select product category" />
//             </SelectTrigger>
//             <SelectContent className="rounded-none">
//               <SelectItem value="none" disabled>
//                 No category
//               </SelectItem>
//               {category.map((cat) => (
//                 <SelectItem key={cat.id} value={cat.id}>
//                   {cat.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//         <div className="grid gap-2">
//           <Label className={labelClass}>Priority (Sort Order)</Label>
//           <Input
//             type="number"
//             value={form.sort_order}
//             onChange={(e) =>
//               setForm({ ...form, sort_order: Number(e.target.value) })
//             }
//             className={inputClass}
//             placeholder="e.g: 1"
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
//         <button
//           type="submit"
//           disabled={isPending}
//           className="w-full mt-6 px-4 py-2 bg-black text-white text-sm font-bold hover:bg-gray-800 disabled:opacity-50 transition-colors"
//         >
//           {isPending
//             ? isEditing
//               ? "Saving…"
//               : "Creating…"
//             : isEditing
//               ? "Save changes"
//               : "Add Category"}
//         </button>
//       </CardContent>
//     </Card>
//   );
// };

// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { useCategory } from "@/hooks/useCategory";

// const CategoryForm = ({ onSuccess }: { onSuccess?: () => void }) => {
//   const { createCategorydata } = useCategory();
//   const [preview, setPreview] = useState<string | null>(null);

//   const [form, setForm] = useState({
//     name: "",
//     image: null as File | null,
//     slug: "",
//     sort_order: 0,
//     parent: "",
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setForm((prev) => ({ ...prev, logoimage: file }));
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const fd = new FormData();
//     fd.append("name", form.name);
//     fd.append("slug", String(form.slug));
//     if (form.image) {
//       fd.append("image", form.image);
//     }

//     createCategorydata.mutate(fd, {
//       onSuccess: () => {
//         setForm({ name: "", image: null, slug: "", sort_order: 0 });
//         setPreview(null);
//         if (onSuccess) onSuccess();
//       },
//     });
//   };

//   const inputClass =
//     "w-full px-4 py-2 border border-gray-300 text-sm outline-none focus:border-black rounded-none transition-colors";
//   const labelClass =
//     "block text-[10px] font-bold uppercase text-gray-500 mb-1 mt-4";

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
//       <div>
//         <label className={labelClass}>Category Name</label>
//         <input
//           type="text"
//           name="name"
//           placeholder="e.g. Sony, Logitech"
//           value={form.name}
//           onChange={handleChange}
//           className={inputClass}
//           required
//         />
//       </div>

//       <div>
//         <label className={labelClass}>Slug</label>
//         <textarea
//           name="slug"
//           placeholder="Enter brand details..."
//           value={form.slug}
//           onChange={handleChange}
//           className={`${inputClass} h-24 resize-none`}
//           rows={4}
//         />
//       </div>

//       <div>
//         <label className={labelClass}>Brand Logo</label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageChange}
//           className={inputClass}
//         />
//         {preview && (
//           <div className="mt-2 relative w-20 h-20 border border-gray-200">
//             <Image
//               src={preview}
//               alt="Preview"
//               fill
//               className="object-cover"
//               unoptimized
//             />
//           </div>
//         )}
//       </div>

//       <div className="pt-4">
//         <button
//           type="submit"
//           disabled={createCategorydata.isPending}
//           className="w-full bg-black text-white py-2 text-sm font-bold hover:bg-gray-800 disabled:opacity-50 transition-colors uppercase tracking-widest"
//         >
//           {createCategorydata.isPending ? "Creating..." : "Create Brand"}
//         </button>
//       </div>

//       {createCategorydata.isError && (
//         <p className="text-red-500 text-[10px] uppercase font-bold mt-2 text-center">
//           Failed to create brand.
//         </p>
//       )}

//       {createCategorydata.isSuccess && (
//         <p className="text-green-600 text-[10px] uppercase font-bold mt-2 text-center">
//           Category created successfully!
//         </p>
//       )}
//     </form>
//   );
// };

// export default CategoryForm;

// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { useCategory } from "@/hooks/useCategory";
// import { ProductCategory } from "@/types/category";
// import { toast } from "sonner";

// interface CategoryFormProps {
//   initialData?: ProductCategory | null;
//   onSuccess?: () => void;
// }

// const CategoryForm = ({ initialData, onSuccess }: CategoryFormProps) => {
//   const { createCategorydata, updateCategorydata, data } = useCategory();
//   const categories: ProductCategory[] = data?.results ?? [];

//   const [preview, setPreview] = useState<string | null>(
//     initialData?.image || null,
//   );

//   const [form, setForm] = useState({
//     name: initialData?.name ?? "",
//     slug: initialData?.slug ?? "",
//     sort_order: initialData?.sort_order ?? 0,
//     parent: initialData?.parent?.id ?? "",
//     image: null as File | null,
//   });

//   const isEditing = !!initialData;
//   const isPending = isEditing
//     ? updateCategorydata.isPending
//     : createCategorydata.isPending;

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]; // This is the actual File object
//     if (file) {
//       setForm((prev) => ({ ...prev, image: file })); // Store the object
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const fd = new FormData();
//     fd.append("name", form.name);
//     fd.append("slug", form.slug);
//     fd.append("sort_order", String(form.sort_order));

//     // Only append parent if a value is selected
//     if (form.parent) {
//       fd.append("parent", form.parent);
//     }

//     if (form.image) {
//       fd.append("image", form.image);
//     }

//     if (isEditing) {
//       updateCategorydata.mutate(
//         { id: initialData.id, data: fd as any },
//         {
//           onSuccess: () => {
//             toast.success("Category updated successfully");
//             onSuccess?.();
//           },
//         },
//       );
//     } else {
//       createCategorydata.mutate(fd as any, {
//         onSuccess: () => {
//           toast.success("Category created successfully");
//           onSuccess?.();
//         },
//       });
//     }
//   };

//   const inputClass =
//     "w-full px-4 py-2 border border-gray-300 text-sm outline-none focus:border-black rounded-none transition-colors";
//   const labelClass =
//     "block text-[10px] font-bold uppercase text-gray-500 mb-1 mt-4";

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col space-y-1">
//       <div>
//         <label className={labelClass}>Category Name</label>
//         <input
//           required
//           type="text"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//           className={inputClass}
//           placeholder="e.g. Electronics"
//         />
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className={labelClass}>Slug</label>
//           <input
//             type="text"
//             value={form.slug}
//             onChange={(e) => setForm({ ...form, slug: e.target.value })}
//             className={inputClass}
//             placeholder="electronics-gadgets"
//           />
//         </div>
//         <div>
//           <label className={labelClass}>Sort Order (Priority)</label>
//           <input
//             type="number"
//             value={form.sort_order}
//             onChange={(e) =>
//               setForm({ ...form, sort_order: Number(e.target.value) })
//             }
//             className={inputClass}
//           />
//         </div>
//       </div>

//       <div>
//         <label className={labelClass}>Parent Category</label>
//         <select
//           value={form.parent}
//           onChange={(e) => setForm({ ...form, parent: e.target.value })}
//           className={inputClass}
//         >
//           <option value="">None (Top Level)</option>
//           {categories
//             .filter((c) => c.id !== initialData?.id) // Prevent selecting itself as parent
//             .map((cat) => (
//               <option key={cat.id} value={cat.id}>
//                 {cat.name}
//               </option>
//             ))}
//         </select>
//       </div>

//       <div>
//         <label className={labelClass}>Category Image</label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageChange}
//           className={inputClass}
//         />
//         {preview && (
//           <div className="mt-2 relative w-20 h-20 border border-gray-200">
//             <Image
//               src={preview}
//               alt="Preview"
//               fill
//               className="object-cover"
//               unoptimized
//             />
//           </div>
//         )}
//       </div>

//       <div className="pt-4">
//         <button
//           type="submit"
//           disabled={isPending}
//           className="w-full bg-black text-white py-2 text-xs font-bold hover:bg-gray-800 disabled:opacity-50 transition-colors uppercase tracking-widest"
//         >
//           {isPending
//             ? "Processing..."
//             : isEditing
//               ? "Save Changes"
//               : "Create Category"}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default CategoryForm;

// "use client";
// // FIX BUG 8: submit button was not connected to any mutation — clicking did nothing
// // Now wired to useProduct().createProductdata.mutate()
// // Image upload uses FormData (multipart) — api.ts default is json, override here
// import { useCategory } from "@/hooks/useCategory";
// import Image from "next/image";
// import { useState } from "react";
// import { toast } from "sonner";

// export const EMPTY_CATEGORY_FORM = {
//   name: "",
//   image: null as File | null,
//   sort_order: 0,

//   slug: "",
//   parent: "" as string,
// };

// type CategoryFormState = typeof EMPTY_CATEGORY_FORM;

// interface CategoryFormProps {
//   onSuccess?: () => void;
//   initialData?: Partial<CategoryFormState>;
//   categoryId?: string;
// }

// export const CategoryForm = ({
//   onSuccess,
//   initialData,
//   categoryId,
// }: CategoryFormProps) => {
//   const { createCategorydata, updateCategorydata } = useCategory();
//   const { data: categoryData } = useCategory();
//   const categories = categoryData?.results ?? [];

//   const [form, setForm] = useState<CategoryFormState>({
//     ...EMPTY_CATEGORY_FORM,
//     ...initialData,
//   });
//   const [preview, setPreview] = useState<string | null>(null);

//   const isEditing = !!categoryId;
//   const isPending = isEditing
//     ? updateCategorydata.isPending
//     : createCategorydata.isPending;

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] ?? null;
//     setForm((f) => ({ ...f, image: file }));
//     if (file) {
//       // Revoke old object URL to prevent memory leak
//       if (preview) URL.revokeObjectURL(preview);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     const fd = new FormData();
//     fd.append("name", form.name);
//     fd.append("slug", form.slug);
//     fd.append("sort_order", String(form.sort_order));
//     if (form.image) fd.append("image", form.image);
//     form.parent.forEach((id) => fd.append("parent", id));

//     if (isEditing) {
//       updateCategorydata.mutate(
//         { id: categoryId, data: fd as any },
//         {
//           onSuccess: () => {
//             toast.success("Category updated.");
//             onSuccess?.();
//           },
//           onError: () => toast.error("Failed to update category."),
//         },
//       );
//     } else {
//       createCategorydata.mutate(fd as any, {
//         onSuccess: () => {
//           toast.success("Category created.");
//           setForm(EMPTY_CATEGORY_FORM);
//           setPreview(null);
//           onSuccess?.();
//         },
//         onError: (err: any) => {
//           const msg =
//             err?.response?.data?.sku?.[0] ?? "Failed to create category.";
//           toast.error(msg);
//         },
//       });
//     }
//   };

//   const inputClass =
//     "w-full px-4 py-2 border border-gray-300 text-sm outline-none focus:border-black rounded-none";
//   const labelClass =
//     "block text-xs font-bold uppercase text-gray-500 mb-1 mt-4";

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-1">
//       <div>
//         <label className={labelClass}>Category name *</label>
//         <input
//           required
//           value={form.name}
//           onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
//           className={inputClass}
//           placeholder="e.g. iPhone 15 Case"
//         />
//       </div>

//       <div>
//         <label className={labelClass}>SLUG *</label>
//         <input
//           required
//           value={form.slug}
//           onChange={(e) => setForm((f) => ({ ...f, sku: e.target.value }))}
//           className={inputClass}
//           placeholder="e.g. CASE-IP15-001"
//         />
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className={labelClass}>Sort order</label>
//           <input
//             type="number"
//             min={0}
//             value={form.sort_order}
//             onChange={(e) =>
//               setForm((f) => ({ ...f, sort_order: Number(e.target.value) }))
//             }
//             className={inputClass}
//           />
//         </div>
//       </div>

//       <div>
//         <label className={labelClass}>Parent</label>
//         <select
//           multiple
//           value={form.parent}
//           onChange={(e) => {
//             const selected = Array.from(e.target.selectedOptions).map(
//               (o) => o.value,
//             );
//             setForm((f) => ({ ...f, parent: selected }));
//           }}
//           className={`${inputClass} h-28`}
//         >
//           {categories.map((p: any) => (
//             <option key={p.id} value={p.id}>
//               {p.name}
//             </option>
//           ))}
//         </select>
//         <p className="text-[10px] text-gray-400 mt-1">
//           Hold Ctrl/Cmd to select multiple
//         </p>
//       </div>

//       <div>
//         <label className={labelClass}>Image</label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageChange}
//           className={inputClass}
//         />
//         {preview && (
//           <Image
//             src={preview}
//             alt="preview"
//             width={80}
//             height={80}
//             className="mt-2 object-cover rounded"
//             // Unoptimized because it's a local blob URL
//             unoptimized
//           />
//         )}
//       </div>

//       <button
//         type="submit"
//         disabled={isPending}
//         className="w-full mt-6 px-4 py-2 bg-black text-white text-sm font-bold hover:bg-gray-800 disabled:opacity-50 transition-colors"
//       >
//         {isPending
//           ? isEditing
//             ? "Saving…"
//             : "Creating…"
//           : isEditing
//             ? "Save changes"
//             : "Add Category"}
//       </button>
//     </form>
//   );
// };

"use client";
import { useCategory } from "@/hooks/useCategory";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

const EMPTY = {
  name: "",
  slug: "",
  sort_order: 0,
  parent: "",
  image: null as File | null,
};

interface Props {
  onSuccess?: () => void;
  initialData?: Partial<typeof EMPTY>;
  categoryId?: string;
}

const inputClass =
  "w-full px-4 py-2 border border-gray-300 text-sm outline-none focus:border-black rounded-none";
const labelClass = "block text-xs font-bold uppercase text-gray-500 mb-1 mt-4";

export const CategoryForm = ({ onSuccess, initialData, categoryId }: Props) => {
  const {
    createCategorydata,
    updateCategorydata,
    data: categoryData,
  } = useCategory();
  const categories = categoryData?.results ?? [];

  const [form, setForm] = useState({ ...EMPTY, ...initialData });
  const [preview, setPreview] = useState<string | null>(null);

  const isEditing = !!categoryId;
  const isPending = isEditing
    ? updateCategorydata.isPending
    : createCategorydata.isPending;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setForm((f) => ({ ...f, image: file }));
    if (file) {
      if (preview) URL.revokeObjectURL(preview);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("slug", form.slug);
    fd.append("sort_order", String(form.sort_order));
    if (form.parent) fd.append("parent", form.parent); // ✅ single value
    if (form.image) fd.append("image", form.image);

    const callbacks = {
      onSuccess: () => {
        toast.success(isEditing ? "Category updated." : "Category created.");
        onSuccess?.();
      },
      onError: (err: any) => {
        const msg =
          err?.response?.data?.slug?.[0] ??
          err?.response?.data?.name?.[0] ??
          "Failed to save category.";
        toast.error(msg);
      },
    };

    if (isEditing) {
      updateCategorydata.mutate(
        { id: categoryId!, data: fd as any },
        callbacks,
      );
    } else {
      createCategorydata.mutate(fd as any, {
        ...callbacks,
        onSuccess: () => {
          toast.success("Category created.");
          setForm(EMPTY);
          setPreview(null);
          onSuccess?.();
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div>
        <label className={labelClass}>Category name *</label>
        <input
          required
          value={form.name}
          onChange={(e) => {
            const name = e.target.value;
            setForm((f) => ({
              ...f,
              name,
              slug: isEditing
                ? f.slug
                : name
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^a-z0-9-]/g, ""),
            }));
          }}
          className={inputClass}
          placeholder="e.g. Electronics"
        />
      </div>

      <div>
        <label className={labelClass}>Slug *</label>
        <input
          required
          value={form.slug}
          onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} // ✅ slug not sku
          className={inputClass}
          placeholder="auto-generated from name"
        />
      </div>

      <div>
        <label className={labelClass}>Sort order</label>
        <input
          type="number"
          min={0}
          value={form.sort_order}
          onChange={(e) =>
            setForm((f) => ({ ...f, sort_order: Number(e.target.value) }))
          }
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Parent category (optional)</label>
        <select
          value={form.parent}
          onChange={(e) => setForm((f) => ({ ...f, parent: e.target.value }))} // ✅ single select
          className={inputClass}
        >
          <option value="">No parent (root level)</option>
          {categories
            .filter((c: any) => c.id !== categoryId)
            .map((c: any) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Image (optional)</label>
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
            className="mt-2 object-cover"
            unoptimized
          />
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full mt-4 py-2 bg-black text-white text-sm font-bold hover:bg-gray-800 disabled:opacity-50"
      >
        {isPending ? "Saving…" : isEditing ? "Save Changes" : "Add Category"}
      </button>
    </form>
  );
};
