// import Link from "next/link";
// import Menu from "./Menu";
// import Image from "next/image";
// import { SearchBar } from "./SearchBar";
// import NavIcons from "./Navicons";

// const Navbar = () => {
//   return (
//     <div className="h-20 px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 relative bg-white">
//       <div className="h-full flex items-center justify-between md:hidden">
//         <Link href="/">
//           <div className="text-2xl tracking-wide color-black">TechHub</div>
//         </Link>
//         <Menu />
//       </div>
//       <div className="hidden md:flex items-center justify-between gap-8 h-full">
//         {/* left */}
//         <div className="w-1/3 xl:w-1/2 flex items-center gap-12">
//           <Link href="/" className="flex items-center gap-3">
//             <Image
//               src="/techhub.png"
//               alt=""
//               width={30}
//               height={30}
//               className="rounded-lg"
//             />
//             <div className="text-2xl tracking-wide">TechHub</div>
//           </Link>
//           <div className="hidden xl:flex gap-4">
//             <Link href="/"> Home</Link>
//             <Link href="/"> Shop</Link>
//             <Link href="/"> Product</Link>
//             <Link href="/"> Category</Link>
//             <Link href="/"> Contact</Link>
//           </div>
//         </div>
//         {/* Right */}
//         <div className="w-2/3 xl:w-1/2 flex items-center justify-between gap-8">
//           <SearchBar />
//           <NavIcons />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
// FIX: xl:32 → xl:px-32 (missing px- prefix, no padding was applied)
// FIX: color-black → text-black (not a Tailwind class)
// FIX: all nav links pointed to "/" — fixed to correct hrefs

import Link from "next/link";
import Menu from "../common/Menu";
import Image from "next/image";
import { SearchBar } from "../common/SearchBar";
import NavIcons from "./Navicons";

const Navbar = () => {
  return (
    <div className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative bg-white border-b border-gray-100">
      {/* Mobile */}
      <div className="h-full flex items-center justify-between md:hidden">
        <Link href="/">
          <div className="text-2xl tracking-wide text-black">TechHub</div>
        </Link>
        <Menu />
      </div>

      {/* Desktop */}
      <div className="hidden md:flex items-center justify-between gap-8 h-full">
        {/* Left */}
        <div className="w-1/3 xl:w-1/2 flex items-center gap-12">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/techhub.png" alt="TechHub" width={30} height={30} className="rounded-lg" />
            <div className="text-2xl tracking-wide">TechHub</div>
          </Link>
          <div className="hidden xl:flex gap-6 text-sm">
            <Link href="/" className="hover:text-gray-500 transition-colors">Home</Link>
            <Link href="/products" className="hover:text-gray-500 transition-colors">Shop</Link>
            <Link href="/products" className="hover:text-gray-500 transition-colors">Products</Link>
            <Link href="/#categories" className="hover:text-gray-500 transition-colors">Category</Link>
            <Link href="/#contact" className="hover:text-gray-500 transition-colors">Contact</Link>
          </div>
        </div>

        {/* Right */}
        <div className="w-2/3 xl:w-1/2 flex items-center justify-between gap-8">
          <SearchBar />
          <NavIcons />
        </div>
      </div>
    </div>
  );
};

export default Navbar;