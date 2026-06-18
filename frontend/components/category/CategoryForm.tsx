
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
