import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mt-24 py-24 bg-gray-100 text-sm">
      <div className="flex flex-col md:flex-row justify-between gap-24">
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <Link href="/">
            <div className="text-2xl tracking-wide">TechHub</div>
          </Link>
          <p>Godawari Municipality-2 , Kailali</p>
          <span className="font-semibold">techub@gmail.com</span>
          <span className="font-semibold">724139807</span>
          <div className="flex gap-6">
            <Image src="/facebook.png" alt="facebook" width={16} height={16} />
            <Image
              src="/instagram.png"
              alt="instagram"
              width={16}
              height={16}
            />
          </div>
        </div>

        <div className="hidden lg:flex justify-between w-1/2">
          <div className="flex flex-col gap-6">
            <h1 className="font-medium text-lg">Company</h1>
            <Link href="">About us</Link>
            <Link href="">Careers</Link>
            <Link href="">Contact us</Link>
          </div>

          <div className="flex flex-col gap-6">
            <h1 className="font-medium text-lg">Shop</h1>
            <Link href="">New Arrivals</Link>
          </div>

          <div className="flex flex-col gap-6">
            <h1 className="font-medium text-lg">Help</h1>
            <Link href="">Customer Service</Link>
            <Link href="">My Account</Link>
            <Link href="">Find a store</Link>
            <Link href="">Legal & Privacy</Link>
          </div>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-6">
          <h1 className="font-medium text-lg">SUBSCRIBE</h1>
          <p>
            Be the first to get the latest info about trends, promotions and
            much more!
          </p>

          <div className="flex">
            <input
              type="text"
              placeholder="Email address"
              className="p-4 w-3/4 bg-transparent border border-gray-300"
            />
            <button className="w-1/4 bg-black text-white">Join</button>
          </div>

          <span className="font-semibold">Secure Payments</span>

          <div className="flex gap-4">
            <Image src="/facebook.png" alt="facebook" width={16} height={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
