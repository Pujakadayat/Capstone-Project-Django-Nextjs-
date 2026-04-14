"use client";

import { useState } from "react";
import Image from "next/image";
import { useBrand } from "@/hooks/usebrand";

const BrandCreateForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { createBranddata } = useBrand();
  const [preview, setPreview] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    logoimage: null as File | null,
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prev) => ({ ...prev, logoimage: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("description", form.description);
    if (form.logoimage) {
      fd.append("logoimage", form.logoimage);
    }

    createBranddata.mutate(fd, {
      onSuccess: () => {
        setForm({ name: "", logoimage: null, description: "" });
        setPreview(null);
        if (onSuccess) onSuccess();
      },
    });
  };

  const inputClass =
    "w-full px-4 py-2 border border-gray-300 text-sm outline-none focus:border-black rounded-none transition-colors";
  const labelClass =
    "block text-[10px] font-bold uppercase text-gray-500 mb-1 mt-4";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
      <div>
        <label className={labelClass}>Brand Name</label>
        <input
          type="text"
          name="name"
          placeholder="e.g. Sony, Logitech"
          value={form.name}
          onChange={handleChange}
          className={inputClass}
          required
        />
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea
          name="description"
          placeholder="Enter brand details..."
          value={form.description}
          onChange={handleChange}
          className={`${inputClass} h-24 resize-none`}
          rows={4}
        />
      </div>

      <div>
        <label className={labelClass}>Brand Logo</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className={inputClass}
        />
        {preview && (
          <div className="mt-2 relative w-20 h-20 border border-gray-200">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={createBranddata.isPending}
          className="w-full bg-black text-white py-2 text-sm font-bold hover:bg-gray-800 disabled:opacity-50 transition-colors uppercase tracking-widest"
        >
          {createBranddata.isPending ? "Creating..." : "Create Brand"}
        </button>
      </div>

      {createBranddata.isError && (
        <p className="text-red-500 text-[10px] uppercase font-bold mt-2 text-center">
          Failed to create brand.
        </p>
      )}

      {createBranddata.isSuccess && (
        <p className="text-green-600 text-[10px] uppercase font-bold mt-2 text-center">
          Brand created successfully!
        </p>
      )}
    </form>
  );
};

export default BrandCreateForm;
