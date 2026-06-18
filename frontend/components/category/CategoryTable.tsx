

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
import { ProductCategory } from "@/types/category";
import { useCategory } from "@/hooks/useCategory";

interface CategoryTableProps {
  role: Role;
  onEdit: (p: ProductCategory) => void;
}

export const CategoryTable = ({ role, onEdit }: CategoryTableProps) => {
  const { data, isLoading, deleteCategorydata } = useCategory();

  const categories = data?.results ?? [];
  const isAdmin = role === Role.ADMIN;

  const handleDelete = (id: string, name: string) => {
    deleteCategorydata.mutate(id, {
      onSuccess: () => toast.success(`${name} deleted successfully.`),
      onError: () => toast.error(`Failed to delete ${name}.`),
    });
  };

  if (isLoading)
    return <p className="text-xs animate-pulse">Loading categories...</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-b-2 border-black">
          {["Category Name", "Created At", "Actions"].map((h) => (
            <TableHead
              key={h}
              className="text-[10px] font-bold uppercase text-black"
            >
              {h}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((cat) => (
          <TableRow
            key={cat.id}
            className="border-b border-gray-100 hover:bg-gray-50/50"
          >
            <TableCell className="font-medium text-sm">{cat.name}</TableCell>
            {/* <TableCell className="text-xs text-gray-500">{cat.slug}</TableCell> */}
            <TableCell className="text-xs text-gray-400">
              {new Date(cat.created_at).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(cat)}
                  className="hover:bg-black hover:text-white transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
                {isAdmin && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="rounded-none border-2 border-black">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="uppercase font-bold tracking-tight">
                          Confirm Deletion
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-xs">
                          This will permanently delete{" "}
                          <strong>{cat.name}</strong>. This action cannot be
                          undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="rounded-none border-black text-xs uppercase font-bold">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="rounded-none bg-red-600 text-white text-xs uppercase font-bold hover:bg-red-700"
                          onClick={() => handleDelete(cat.id, cat.name)}
                        >
                          Delete Category
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
