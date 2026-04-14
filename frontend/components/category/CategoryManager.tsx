"use client";

import { Role } from "@/types/user";
import { useState } from "react";
import { Button } from "../ui/button";
import { Plus, Settings2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ProductCategory } from "@/types/category";
import { CategoryTable } from "./CategoryTable";
import { CategoryForm } from "./CategoryForm";

interface Props {
  role: Role;
}

export default function CategoryManager({ role }: Props) {
  const [isFormOpen, setFormOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<ProductCategory | null>(
    null,
  );
  const isAdmin = role === Role.ADMIN;
  const handleEdit = (p: ProductCategory) => {
    setEditCategory(p);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between border-b-2 border-black pb-4 mb-8">
        <div>
          <p className="text-[10px] uppercase text-gray-400 mb-1 font-bold">
            Inventory System
          </p>
          <h1 className="text-3xl font-bold tracking-tighter uppercase">
            Category Catalogue
          </h1>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setFormOpen(true)}
            className="rounded-none bg-black text-white px-6 font-bold text-xs hover:bg-gray-800"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
        </div>
      </div>
      <CategoryTable role={role} onEdit={handleEdit} />
      <Dialog
        open={isFormOpen || !!editCategory}
        onOpenChange={(open) => {
          if (!open) {
            setFormOpen(false);
            setEditCategory(null);
          }
        }}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-none border-2 border-black">
          <DialogHeader>
            <DialogTitle className="font-bold uppercase tracking-widest">
              {editCategory ? "Edit Category" : "Create New Category"}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {editCategory
                ? "Edit an existing category"
                : "Create a new product category"}
            </DialogDescription>
          </DialogHeader>
          <CategoryForm
            categoryId={editCategory?.id}
            initialData={editCategory}
            onSuccess={() => {
              setFormOpen(false);
              setEditCategory(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
