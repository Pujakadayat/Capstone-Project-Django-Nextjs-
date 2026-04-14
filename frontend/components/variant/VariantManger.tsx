// "use client";

// import { useState } from "react";
// import { Role } from "@/types/user";
// import { Button } from "../ui/button";
// import { Plus } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "../ui/dialog";
// import { VariantTable } from "./VariantTable";
// import { VariantForm } from "./VariantForm";
// import { ProductVariant } from "@/types/productvariant";

// export default function VariantManager({ role }: { role: Role }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selected, setSelected] = useState<ProductVariant | null>(null);

//   return (
//     <div className="space-y-6">
//       <div className="flex items-end justify-between border-b-2 border-black pb-4 mb-8">
//         <h1 className="text-3xl font-bold uppercase tracking-tighter">
//           Variant Inventory
//         </h1>
//         <Button
//           onClick={() => setIsOpen(true)}
//           className="rounded-none bg-black text-white px-6 text-xs font-bold"
//         >
//           <Plus className="w-4 h-4 mr-2" /> Add New Variant
//         </Button>
//       </div>

//       <VariantTable
//         role={role}
//         onEdit={(v) => {
//           setSelected(v);
//           setIsOpen(true);
//         }}
//       />

//       <Dialog
//         open={isOpen}
//         onOpenChange={(v) => {
//           setIsOpen(v);
//           if (!v) setSelected(null);
//         }}
//       >
//         <DialogContent className="max-w-xl rounded-none border-2 border-black">
//           <DialogHeader>
//             <DialogTitle className="uppercase font-bold tracking-widest text-sm">
//               {selected ? "Edit Variant" : "Create Variant"}
//             </DialogTitle>
//             <DialogDescription className="sr-only">
//               Variant details form
//             </DialogDescription>
//           </DialogHeader>
//           <VariantForm
//             initialData={selected}
//             onSuccess={() => {
//               setIsOpen(false);
//               setSelected(null);
//             }}
//           />
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { Role } from "@/types/user";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { VariantTable } from "./VariantTable";
import { VariantForm } from "./VariantForm";
import { ProductVariant } from "@/types/productvariant";

export default function VariantManager({ role }: { role: Role }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<ProductVariant | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between border-b-2 border-black pb-4 mb-8">
        <h1 className="text-3xl font-bold uppercase tracking-tighter">
          Variant Inventory
        </h1>
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-none bg-black text-white px-6 text-xs font-bold"
        >
          <Plus className="w-4 h-4 mr-2" /> Add New Variant
        </Button>
      </div>

      <VariantTable
        role={role}
        onEdit={(v) => {
          setSelected(v);
          setIsOpen(true);
        }}
      />

      <Dialog
        open={isOpen}
        onOpenChange={(v) => {
          setIsOpen(v);
          if (!v) setSelected(null);
        }}
      >
        <DialogContent className="max-w-xl rounded-none border-2 border-black">
          <DialogHeader>
            <DialogTitle className="uppercase font-bold tracking-widest text-sm">
              {selected ? "Edit Variant" : "Create Variant"}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Variant details form
            </DialogDescription>
          </DialogHeader>
          <VariantForm
            initialData={selected}
            onSuccess={() => {
              setIsOpen(false);
              setSelected(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
