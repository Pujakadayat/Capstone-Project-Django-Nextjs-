"use client";

import { Product } from "@/types/product";
import { Role } from "@/types/user";
import { useState } from "react";
import { Button } from "../ui/button";
import { Plus, Settings2 } from "lucide-react";
import { ProductTable } from "./ProductTable";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ProductForm } from "./ProductForm";
import VariantManager from "../variant/VariantManger";

interface Props {
  role: Role;
}

export default function ProductManager({ role }: Props) {
  const [isFormOpen, setFormOpen] = useState(false);
  const [isVariantOpen, setVariantOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const isAdmin = role === Role.ADMIN;
  const handleEdit = (p: Product) => {
    setEditProduct(p);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between border-b-2 border-black pb-4 mb-8">
        <div>
          <p className="text-[10px] uppercase text-gray-400 mb-1 font-bold">
            Inventory System
          </p>
          <h1 className="text-3xl font-bold tracking-tighter uppercase">
            Product Catalogue
          </h1>
        </div>
        <div className="flex gap-2">
          {isAdmin && (
            <Button
              variant="outline"
              onClick={() => setVariantOpen(true)}
              className="rounded-none border-black border-2 font-bold text-xs"
            >
              <Settings2 className="w-4 h-4 mr-2" />
              Manage Varinats
            </Button>
          )}
          <Button
            onClick={() => setFormOpen(true)}
            className="rounded-none bg-black text-white px-6 font-bold text-xs hover:bg-gray-800"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add product
          </Button>
        </div>
      </div>
      <ProductTable role={role} onEdit={handleEdit} />
      <Dialog
        open={isFormOpen || !!editProduct}
        onOpenChange={(open) => {
          if (!open) {
            setFormOpen(false);
            setEditProduct(null);
          }
        }}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-none border-2 border-black">
          <DialogHeader>
            <DialogTitle className="font-bold uppercase tracking-widest">
              {editProduct ? "Edit Product" : "Create New Product"}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Product form
            </DialogDescription>
          </DialogHeader>
          <ProductForm
            productId={editProduct?.id}
            initialData={editProduct}
            onSuccess={() => {
              setFormOpen(false);
              setEditProduct(null);
            }}
          />
        </DialogContent>
      </Dialog>
      {/* {isAdmin && (
        <Dialog open={isVariantOpen} onOpenChange={setVariantOpen}>
          <DialogContent className="max-w-4xl rounded-none border-2 border-black">
            <DialogHeader>
              <DialogTitle className="font-bold uppercase">
                Global Variant{" "}
              </DialogTitle>
            </DialogHeader>
          </DialogContent>
          <VariantManager role={Role.ADMIN} />
        </Dialog>
      )} */}
    </div>
  );
}
