// "use client";

// import { Role } from "@/types/user";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// import { useEffect, useState } from "react";
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
// import { logout } from "@/lib/auth";
// import { getServerAuth } from "@/lib/auth-server";

// const sidebarlinks = (role: string | null) => {
//   const links = [
//     { href: "/dashboard", name: "Dashboard" },
//     { href: "/stock-control", name: "Stock Control" },
//     { href: "/analytics", name: "Analytics" },
//     { href: "/team", name: "Team" },
//     { href: "/products", name: "Products" },
//     { href: "/category", name: "Category" },
//     { href: "/brand", name: "Brand" },
//   ];

//   if (role === Role.STAFF || role === Role.ADMIN) {
//     links.splice(1, 0, { href: "/products", name: "Products" });
//   }
//   return links;
// };

// export default function Sidebar() {
//   const pathname = usePathname();
//   const [role, setRole] = useState<string | null>(null);

//   const links = sidebarlinks(role);
//   return (
//     <div className="flex flex-col h-full px-4 py-8 gap-1">
//       {links.map((link) => {
//         return (
//           <Link
//             key={link.name}
//             href={link.href}
//             className={`text-[11px] uppercase font-bold  transition-colors px-3 py-2
//           ${pathname === link.href ? "bg-black text-white" : "text-gray-500 hover:text-black"}`}
//           >
//             {link.name}
//           </Link>
//         );
//       })}

//       <div className="mt-auto">
//         <AlertDialog>
//           <AlertDialogTrigger asChild>
//             <button className="w-full text-left text-[11px] font-bold uppercase  px-3 py-2 text-gray-500 hover:text-black transition-colors">
//               Logout
//             </button>
//           </AlertDialogTrigger>
//           <AlertDialogContent className="rounded-none">
//             <AlertDialogHeader>
//               <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
//               <AlertDialogDescription className="text-sm text-gray-500">
//                 Are you sure you want to logout?
//               </AlertDialogDescription>
//             </AlertDialogHeader>
//             <AlertDialogFooter>
//               <AlertDialogCancel
//                 className="rounded-none"
//                 variant={undefined}
//                 size={undefined}
//               >
//                 Cancel
//               </AlertDialogCancel>
//               <AlertDialogAction
//                 onClick={logout}
//                 className="rounded-none bg-black text-white hover:bg-black-50"
//                 variant={undefined}
//                 size={undefined}
//               >
//                 Logout
//               </AlertDialogAction>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>
//       </div>
//     </div>
//   );
// }
"use client";
// FIX BUG 5: Was importing getServerAuth (server-only) inside a "use client" component → build error
// FIX BUG 6: role state was never populated — useEffect was missing, role was always null
// Fix: role comes as a PROP from the server layout, no client-side cookie reading needed
// This also eliminates the hydration mismatch (server renders null, client reads cookie = mismatch)

import { Role } from "@/types/user";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/auth";
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

// Links every staff/admin sees
const COMMON_LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/products", label: "Products" },
  { href: "/dashboard/inventory", label: "Inventory" },
  { href: "/dashboard/orders", label: "Orders" },
];

// Admin-only links
const ADMIN_LINKS = [
  { href: "/dashboard/analytics", label: "Analytics" },
  { href: "/dashboard/users", label: "Users" },
  { href: "/dashboard/variant", label: "Variant" },
  { href: "/dashboard/brand", label: "Brand" },
  { href: "/dashboard/category", label: "Category" },
];

interface SidebarProps {
  role: string | null; // passed from server layout — no client cookie reading needed
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();

  const links =
    role === Role.ADMIN ? [...COMMON_LINKS, ...ADMIN_LINKS] : COMMON_LINKS;

  const isActive = (href: string) =>
    pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

  return (
    <div className="w-56 h-screen border-r flex flex-col px-3 py-6 gap-1 shrink-0 bg-white">
      <div className="text-lg font-medium px-3 mb-6 tracking-wide">TechHub</div>

      {role && (
        <div className="px-3 mb-4">
          <span className="text-[10px] uppercase font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded">
            {role}
          </span>
        </div>
      )}

      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`text-[11px] uppercase font-bold transition-colors px-3 py-2 rounded ${
            isActive(link.href)
              ? "bg-black text-white"
              : "text-gray-500 hover:text-black hover:bg-gray-100"
          }`}
        >
          {link.label}
        </Link>
      ))}

      <div className="mt-auto">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="w-full text-left text-[11px] font-bold uppercase px-3 py-2 text-gray-500 hover:text-black transition-colors">
              Logout
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="rounded-none">
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm logout</AlertDialogTitle>
              <AlertDialogDescription className="text-sm text-gray-500">
                Are you sure you want to log out?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-none">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={logout}
                className="rounded-none bg-black text-white hover:bg-gray-800"
              >
                Logout
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
