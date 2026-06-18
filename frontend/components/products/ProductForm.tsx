

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
