"use client";
import Image from "next/image";
const CartModel = () => {
  const cartItems = true;
  return (
    <div className="w-max absolute p-4 rounded-md shadow-md bg-white top-12 right-0 flex flex-col gap-6 z-20">
      {!cartItems ? (
        <div className=""> Cart is Empty!</div>
      ) : (
        <>
          <h2 className="text-xl">Shopping Cart</h2>
          <div className="flex flex-col gap-4">
            <Image
              src="https://lyka.com.au/blog/cocker-spaniel-breed-guide.jpg"
              alt=" "
              width={72}
              height={96}
              className="object-cover rounded-md"
            />
            <div className="flex flex-col justify-between w-full">
              <div className="">
                <div className="flex items-center justify-between gap-8">
                  <h3 className="font-semibold"> Product Name</h3>
                  <div className="p-1 bg-gray-50 rounded-sm">Rs999</div>
                </div>
                <div className="text-sm text-gray-500">available</div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Qty.2</span>
                <span className="text-blue-500">Remove</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Image
              src="https://lyka.com.au/blog/cocker-spaniel-breed-guide.jpg"
              alt=" "
              width={72}
              height={96}
              className="object-cover rounded-md"
            />
            <div className="flex flex-col justify-between w-full">
              <div className="">
                <div className="flex items-center justify-between gap-8">
                  <h3 className="font-semibold"> Product Name</h3>
                  <div className="p-1 bg-gray-50 rounded-sm">Rs999</div>
                </div>
                <div className="text-sm text-gray-500">available</div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Qty.2</span>
                <span className="text-blue-500">Remove</span>
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex items-center justify-between font-semibold">
              <span>Subtotal:</span>
              <span>Rs999</span>
            </div>
            <p className="text-gray-500 text-sm mt-2 mb-4">
              Cocker Spaniel is a small to medium-sized dog breed known for its
              long, silky ears and gentle expression.
            </p>
            <div className="flex justify-between text-sm">
              <button className="rounded-md py-3 px-4 ring ring-gray-300">
                View cart
              </button>
              <button className="rounded-md py03 px-4 bg-black text-white">
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModel;
