// "use client";

// import { Role } from "@/types/user";
// import { toast } from "sonner";
// import {
//   AlertDialogTrigger,
//   AlertDialogContent,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogCancel,
//   AlertDialogAction,
//   AlertDialog,
// } from "../ui/alert-dialog";
// import { useState, useEffect } from "react";
// import { statusStyle } from "../common/StatusStyle";
// import Image from "next/image";
// import { Product } from "@/types/product";
// import { useProduct } from "@/hooks/useProduct";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";

// interface ProductableProps {
//   products: Product[];
//   isLoading: boolean;
//   role: string;
//   onEdit: (p: Product) => void;
// }

// export const ProductTable = ({ products, role, onEdit }: ProductableProps) => {
//   const { isLoading, deleteProductdata } = useProduct();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const handleDelete = (Product: Product) => {
//     deleteProductdata.mutate(Product.id, {
//       onSuccess: () => toast.success(`${Product.name ?? "Product"} deleted.`),
//       onError: () => toast.error("Failed to delete user."),
//     });
//   };
//   const renderRows = () => {
//     if (!mounted || isLoading) {
//       return Array.from({ length: 4 }).map((_, i) => (
//         <TableRow key={i}>
//           {Array.from({ length: 5 }).map((_, j) => (
//             <TableCell key={j} className="py-3">
//               <div className="h-4 w-full bg-gray-100 animate-pulse"></div>
//             </TableCell>
//           ))}
//         </TableRow>
//       ));
//     }

//     if (products.length === 0) {
//       return (
//         <TableRow>
//           <TableCell
//             colSpan={5}
//             className="text-center text-gray-400 py-8 text-[12px]"
//           >
//             No Products found.
//           </TableCell>
//         </TableRow>
//       );
//     }

//     return products.map((p) => (
//       <TableRow
//         key={p.id}
//         className="border-b border-gray-100 hover:bg-gray-50"
//       >
//         <TableCell className="py-3 font-semibold text-sm">{p.name}</TableCell>
//         <TableCell className="py-3 font-semibold text-sm">{p.sku}</TableCell>
//         <TableCell className="py-3 font-semibold text-sm">
//           <Image src={p.image} height={20} width={20} />
//         </TableCell>

//         <TableCell className="py-3 font-semibold text-sm">
//           {p.has_variant}
//         </TableCell>
//         <TableCell className="py-3 font-semibold text-sm">
//           {p.total_stock}
//         </TableCell>
//         <TableCell className="py-3 font-semibold text-sm">
//           {p.is_low_stock}
//         </TableCell>
//         <TableCell className="py-3 font-semibold text-sm">
//           {p.created_at
//             ? new Date(p.created_at).toLocaleDateString("en-US", {
//                 month: "short",
//                 day: "numeric",
//               })
//             : "-"}
//         </TableCell>

//         <TableCell className="py-3">
//           {role === Role.STAFF && (
//             <button
//               onClick={() => onEdit(p)}
//               className="text-[10px] uppercase rounded-md font-bold border border-black px-3 py-1 hover:bg-black hover:text-white"
//             >
//               Edit
//             </button>
//           )}
//           {role === Role.STAFF && (
//             <AlertDialog>
//               <AlertDialogTrigger asChild>
//                 <button className=" ml-1 text-[10px] rounded-md font-bold uppercase bg-gray-700 text-red-500 px-3 py-1 hover:bg-red-500 hover:text-white transition-colors">
//                   Delete
//                 </button>
//               </AlertDialogTrigger>
//               <AlertDialogContent className="rounded-none">
//                 <AlertDialogHeader>
//                   <AlertDialogTitle className="font-bold">
//                     Delete Product
//                   </AlertDialogTitle>
//                   <AlertDialogDescription className="text-sm text-gray-500">
//                     Are you sure you want to delete{" "}
//                     <strong>{p.name ?? "Product"}</strong>? This cannot be
//                     undone.
//                   </AlertDialogDescription>
//                 </AlertDialogHeader>
//                 <AlertDialogFooter>
//                   <AlertDialogCancel
//                     className="rounded-none"
//                     variant={undefined}
//                     size={undefined}
//                   >
//                     Cancel
//                   </AlertDialogCancel>
//                   <AlertDialogAction
//                     onClick={() => handleDelete(p)}
//                     disabled={deleteProductdata.isPending}
//                     className="rounded-none bg-red-500 hover:bg-red-600 text-white"
//                     variant={undefined}
//                     size={undefined}
//                   >
//                     {deleteProductdata.isPending ? "Deleting..." : "Delete"}
//                   </AlertDialogAction>
//                 </AlertDialogFooter>
//               </AlertDialogContent>
//             </AlertDialog>
//           )}
//         </TableCell>
//       </TableRow>
//     ));
//   };

//   return (
//     <Table>
//       <TableHeader>
//         <TableRow className="border-b border-black">
//           {[
//             "Product Name",
//             "Sku",
//             "Image",
//             "Variant",
//             "Total Stock",
//             "Low Stock",
//           ].map((h) => (
//             <TableHead
//               key={h}
//               className="text-[10px] uppercase font-bold text-gray-500"
//             >
//               {h}
//             </TableHead>
//           ))}
//         </TableRow>
//       </TableHeader>
//       <TableBody>{renderRows()}</TableBody>
//     </Table>
//   );
// };

// "use client";

// import { Role } from "@/types/user";
// import { toast } from "sonner";
// import {
//   AlertDialogTrigger,
//   AlertDialogContent,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogCancel,
//   AlertDialogAction,
//   AlertDialog,
// } from "../ui/alert-dialog";
// import Image from "next/image";
// import { Product } from "@/types/product";
// import { useProduct } from "@/hooks/useProduct";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import { Button } from "../ui/button";
// import { Edit3, Trash2 } from "lucide-react";

// interface ProductableProps {
//   role: Role;
//   onEdit: (p: Product) => void;
// }

// export const ProductTable = ({ role, onEdit }: ProductableProps) => {
//   const { data, isLoading, deleteProductdata } = useProduct();

//   const products = data?.results ?? [];

//   const handleDelete = (products: Product) => {
//     deleteProductdata.mutate(products.id, {
//       onSuccess: () => toast.success(`${products.name ?? "Product"} deleted.`),
//     });
//   };

//   return (
//     <Table>
//       <TableHeader>
//         <TableRow className="border-b border-black">
//           {[
//             "Product Name",
//             "Sku",
//             "Image",
//             "Variant",
//             "Total Stock",
//             "Low Stock",
//           ].map((h) => (
//             <TableHead
//               key={h}
//               className="text-[10px] uppercase font-bold text-gray-500"
//             >
//               {h}
//             </TableHead>
//           ))}
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {products.map((p) => (
//           <TableRow key={p.id} className="border-b border-gray-200">
//             <TableCell className="font-medium">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 bg-gray-100 border border-black relative">
//                   {p.image && (
//                     <Image
//                       src={p.image}
//                       alt={p.name}
//                       fill
//                       className="object-cover"
//                     />
//                   )}
//                 </div>
//                 <span>{p.name}</span>
//               </div>
//             </TableCell>
//             <TableCell className="text-xs">{p.sku}</TableCell>
//             <TableCell>
//               <span
//                 className={`p.is_low_stock ? "text-red-600 font-bold" : ""`}
//               >
//                 {p.total_stock}
//               </span>
//             </TableCell>
//             <TableCell className="text-right">
//               <div className="flex justify-end gap-1">
//                 <Button variant="ghost" size="icon" onClick={() => onEdit(p)}>
//                   <Edit3 className="w-4 h-4" />
//                 </Button>
//                 {role === Role.ADMIN && (
//                   <AlertDialog>
//                     <AlertDialogTrigger>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         className="text-red-600"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </Button>
//                     </AlertDialogTrigger>
//                     <AlertDialogContent className="rounded-none border-2 border-black">
//                       <AlertDialogHeader>
//                         <AlertDialogTitle>
//                           Are you absolutely sure ?
//                         </AlertDialogTitle>
//                         <AlertDialogDescription>
//                           {" "}
//                           This will permanently delete {p.name}
//                         </AlertDialogDescription>
//                       </AlertDialogHeader>
//                       <AlertDialogFooter>
//                         <AlertDialogCancel className="rounded-none">
//                           Cancel
//                         </AlertDialogCancel>
//                         <AlertDialogAction
//                           className="rounded-none bg-red-600 text-white"
//                           onClick={() => handleDelete(p.id)}
//                         >
//                           Delete
//                         </AlertDialogAction>
//                       </AlertDialogFooter>
//                     </AlertDialogContent>
//                   </AlertDialog>
//                 )}
//               </div>
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// };

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
