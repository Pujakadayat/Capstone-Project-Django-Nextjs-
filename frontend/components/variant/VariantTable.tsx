// "use client";

// import { Role } from "@/types/user";
// import { toast } from "sonner";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "../ui/alert-dialog";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import { Button } from "../ui/button";
// import { Edit3, Trash2, Box } from "lucide-react";
// import { ProductVariant } from "@/types/productvariant";
// import { useProductVariant } from "@/hooks/useProductVariant";

// interface Props {
//   role: Role;
//   onEdit: (v: ProductVariant) => void;
// }

// export const VariantTable = ({ role, onEdit }: Props) => {
//   const { data, isLoading, deleteProductVariantdata } = useProductVariant();
//   const variants = data?.results ?? [];
//   const isAdmin = role === Role.ADMIN;

//   const handleDelete = (id: string) => {
//     deleteProductVariantdata.mutate(id, {
//       onSuccess: () => toast.success("Variant deleted successfully"),
//     });
//   };

//   if (isLoading)
//     return (
//       <div className="py-10 text-center text-xs animate-pulse">
//         Loading variants...
//       </div>
//     );

//   return (
//     <Table>
//       <TableHeader>
//         <TableRow className="border-b-2 border-black">
//           <TableHead className="text-[10px] font-bold uppercase text-black">
//             SKU
//           </TableHead>
//           <TableHead className="text-[10px] font-bold uppercase text-black">
//             Product
//           </TableHead>
//           <TableHead className="text-[10px] font-bold uppercase text-black">
//             Attributes
//           </TableHead>
//           <TableHead className="text-[10px] font-bold uppercase text-black">
//             Price (Selling)
//           </TableHead>
//           <TableHead className="text-[10px] font-bold uppercase text-black">
//             Stock
//           </TableHead>
//           <TableHead className="text-[10px] font-bold uppercase text-black text-right">
//             Actions
//           </TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {variants.map((variant) => (
//           <TableRow key={variant.id} className="border-b border-gray-100">
//             <TableCell className="font-mono text-xs">{variant.sku}</TableCell>
//             <TableCell className="font-bold text-xs uppercase">
//               {variant.product_name}
//             </TableCell>
//             <TableCell>
//               <div className="flex flex-wrap gap-1">
//                 {variant.variations.map((v) => (
//                   <span
//                     key={v.id}
//                     className="bg-gray-100 px-2 py-0.5 text-[9px] font-bold uppercase"
//                   >
//                     {v.variation_type.name}: {v.value}
//                   </span>
//                 ))}
//               </div>
//             </TableCell>
//             <TableCell className="text-xs font-bold">
//               ${variant.get_selling_price}
//               {variant.selling_price && (
//                 <span className="ml-1 text-[9px] text-green-600">(Custom)</span>
//               )}
//             </TableCell>
//             <TableCell className="text-xs">{variant.stock}</TableCell>
//             <TableCell className="text-right">
//               <div className="flex justify-end gap-2">
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => onEdit(variant)}
//                 >
//                   <Edit3 className="w-4 h-4" />
//                 </Button>
//                 {isAdmin && (
//                   <AlertDialog>
//                     <AlertDialogTrigger asChild>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         className="text-red-600 hover:bg-red-50"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </Button>
//                     </AlertDialogTrigger>
//                     <AlertDialogContent className="rounded-none border-2 border-black">
//                       <AlertDialogHeader>
//                         <AlertDialogTitle className="uppercase font-bold">
//                           Delete Variant?
//                         </AlertDialogTitle>
//                         <AlertDialogDescription className="text-xs">
//                           Deleting SKU: <strong>{variant.sku}</strong> is
//                           permanent.
//                         </AlertDialogDescription>
//                       </AlertDialogHeader>
//                       <AlertDialogFooter>
//                         <AlertDialogCancel className="rounded-none">
//                           Cancel
//                         </AlertDialogCancel>
//                         <AlertDialogAction
//                           className="rounded-none bg-red-600"
//                           onClick={() => handleDelete(variant.id)}
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Edit3, Trash2, Box } from "lucide-react";
import { ProductVariant, VariationValue } from "@/types/productvariant";
import { useProductVariant } from "@/hooks/useProductVariant";

interface Props {
  role: Role;
  onEdit: (v: ProductVariant) => void;
}

export const VariantTable = ({ role, onEdit }: Props) => {
  const { data, isLoading, deleteProductVariantdata } = useProductVariant();
  const variants = data?.results ?? [];
  const isAdmin = role === Role.ADMIN;

  const handleDelete = (id: string) => {
    deleteProductVariantdata.mutate(id, {
      onSuccess: () => toast.success("Variant deleted successfully"),
    });
  };

  if (isLoading)
    return (
      <div className="py-10 text-center text-xs animate-pulse">
        Loading variants...
      </div>
    );

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-slate-50">
          {["SKU", "Product", "Variant", "Price", "Stock", "Actions"].map(
            (h) => (
              <TableHead
                key={h}
                className="text-[10px] font-bold uppercase text-slate-500"
              >
                {h}
              </TableHead>
            ),
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {variants.map((variant) => (
          <TableRow key={variant.id} className="border-b border-gray-100">
            <TableCell className="font-mono text-xs">{variant.sku}</TableCell>
            <TableCell className="font-bold text-xs uppercase">
              {variant.product_name}
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {variant.variations.map((v: VariationValue) => (
                  <span
                    key={v.id}
                    className="bg-gray-100 px-2 py-0.5 text-[9px] font-bold uppercase"
                  >
                    {v.variation_type?.name || "Unknown Type"}: {v.value}
                  </span>
                ))}
              </div>
            </TableCell>
            <TableCell className="text-xs font-bold">
              ${variant.get_selling_price}
              {variant.selling_price && (
                <span className="ml-1 text-[9px] text-green-600">(Custom)</span>
              )}
            </TableCell>
            <TableCell className="text-xs">{variant.stock}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(variant)}
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
                {isAdmin && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="rounded-none border-2 border-black">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="uppercase font-bold">
                          Delete Variant?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-xs">
                          Deleting SKU: <strong>{variant.sku}</strong> is
                          permanent.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="rounded-none">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="rounded-none bg-red-600"
                          onClick={() => handleDelete(variant.id)}
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
        ))}
      </TableBody>
    </Table>
  );
};
