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
import { Brand } from "@/types/brand";
import { useBrand } from "@/hooks/usebrand";
import { getMediaUrl } from "@/lib/utils";

interface BrandtableProps {
  role: Role;
  onEdit: (p: Brand) => void;
}

export const BrandTable = ({ role, onEdit }: BrandtableProps) => {
  const { data, isLoading, deleteBranddata } = useBrand();

  const brands = data?.results ?? [];

  const handleDelete = (brand: Brand) => {
    deleteBranddata.mutate(brand.id, {
      onSuccess: () => toast.success(`${brand.name ?? "Brand"} deleted.`),
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-b border-black">
          {["Brand Name", "Image", "Created At", "Actions"].map((h) => (
            <TableHead
              key={h}
              className="text-[10px] uppercase font-bold text-gray-500"
            >
              {h}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {brands.map((b) => {
          const imageUrl = getMediaUrl(b.logoimage);

          return (
            <TableRow key={b.id} className="border-b border-gray-200">
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 border border-black relative">
                    {b.logoimage && (
                      <Image
                        src={imageUrl!}
                        alt={b.name}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    )}
                  </div>
                </div>
              </TableCell>

              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <span>{b.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-xs text-gray-400">
                {new Date(b.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button variant="ghost" size="icon" onClick={() => onEdit(b)}>
                    <Edit3 className="w-4 h-4" />
                  </Button>

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
                          <AlertDialogTitle>Delete brand?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will deactivate <strong>{b.name}</strong> in
                            the catalog.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="rounded-lg">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className="rounded-lg bg-red-600 text-white hover:bg-red-700"
                            onClick={() => handleDelete(b)}
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
  );
};
