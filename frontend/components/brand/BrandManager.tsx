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
import { Brand } from "@/types/brand";
import BrandCreateForm from "./BrandCreateForm";
import { BrandTable } from "./BrandTable";



interface Props {
  role: Role;
}

export default function BrandManager({ role }: Props) {
  const [isFormOpen, setFormOpen] = useState(false);
  const [editBrand, setEditBrand] = useState<Brand| null>(
    null,
  );
  const isAdmin = role === Role.ADMIN;
  const handleEdit = (p: Brand) => {
    setEditBrand(p);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between border-b-2 border-black pb-4 mb-8">
        <div>
          <p className="text-[10px] uppercase text-gray-400 mb-1 font-bold">
            Inventory System
          </p>
          <h1 className="text-3xl font-bold tracking-tighter uppercase">
          Brand Catalogue
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
      <BrandTable role={role} onEdit={handleEdit} />
      <Dialog
        open={isFormOpen || !!editBrand}
        onOpenChange={(open) => {
          if (!open) {
            setFormOpen(false);
            setEditBrand(null);
          }
        }}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-none border-2 border-black">
          <DialogHeader>
            <DialogTitle className="font-bold uppercase tracking-widest">
              {editBrand ? "Edit Brand" : "Create New Brand"}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {editBrand
                ? "Edit an existing Brand"
                : "Create a new product Brand"}
            </DialogDescription>
          </DialogHeader>
          <BrandCreateForm
            brand={editBrand?.id}
            initialData={editBrand}
            onSuccess={() => {
              setFormOpen(false);
              setEditBrand(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
