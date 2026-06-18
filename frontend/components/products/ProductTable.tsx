
"use client";

import { Role } from "@/types/user";
import { toast } from "sonner";
import {
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialog,
} from "../ui/alert-dialog";
import Image from "next/image";
import { Product } from "@/types/product";
import { useProduct } from "@/hooks/useProduct";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Edit3, Trash2 } from "lucide-react";
import { getMediaUrl } from "@/lib/utils";

interface ProductableProps {
  role: Role;
  onEdit: (p: Product) => void;
}

export const ProductTable = ({ role, onEdit }: ProductableProps) => {
  const { data, isLoading, deleteProductdata } = useProduct();

  const products: Product[] = data?.results ?? [];

  const handleDelete = (p: Product) => {
    deleteProductdata.mutate(p.id, {
      onSuccess: () => toast.success(`${p.name ?? "Product"} deleted.`),
      onError: () => toast.error("Failed to delete product."),
    });
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50">
            {[
              "Product",
              "SKU",
              "Variant",
              "Stock",
              "Low stock",
              "Created At",
              "Actions",
            ].map((h) => (
              <TableHead
                key={h}
                className="text-[10px] font-bold uppercase text-slate-500"
              >
                {h}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((p) => {
            const imageUrl = getMediaUrl(p.image);
            return (
              <TableRow key={p.id} className="border-b border-slate-100">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-slate-100">
                      {p.image ? (
                        <Image
                          src={imageUrl!}
                          alt={p.name}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      ) : null}
                    </div>
                    <span className="text-sm">{p.name}</span>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-xs">{p.sku}</TableCell>
                <TableCell className="text-xs">
                  {p.has_variant ? "Yes" : "No"}
                </TableCell>
                <TableCell>
                  <span
                    className={
                      p.is_low_stock ? "font-semibold text-red-600" : "text-sm"
                    }
                  >
                    {p.total_stock}
                  </span>
                </TableCell>
                <TableCell className="text-xs">
                  {p.is_low_stock ? "Yes" : "No"}
                </TableCell>
                <TableCell className="text-xs text-gray-400">
                  {new Date(p.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    {(role === Role.STAFF || role === Role.ADMIN) && (
                      <Button
                        variant="ghost"
                        size="icon"
                        type="button"
                        onClick={() => onEdit(p)}
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                    )}
                    {role === Role.ADMIN && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            type="button"
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="rounded-xl">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete product?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will deactivate <strong>{p.name}</strong> in
                              the catalog.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="rounded-lg">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              className="rounded-lg bg-red-600 text-white hover:bg-red-700"
                              onClick={() => handleDelete(p)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
