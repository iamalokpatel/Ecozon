"use client";
import { useRouter } from "next/navigation";
import React from "react";

const FeaturesProjectCard = ({ product }) => {
  const router = useRouter();

  const handleBuy = (id) => {
    router.push(`/buy/${id}`);
  };

  const handleClick = () => {
    const user = localStorage.getItem("userRole");
    console.log(user);
    const isAdmin = user === "admin";
    console.log(isAdmin);

    if (isAdmin) {
      router.push(`/dashboard/edit/${product._id}`);
    } else {
      router.push(`/products/product/${product._id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className=" w-94.4 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer  "
    >
      <div className=" flex-1 overflow-hidden">
        <div className="w-full h-60  rounded-2xl">
          <img
            src={product.image}
            alt={product.title}
            className="object-contain w-full h-full rounded-3xl p-2"
          />
        </div>
      </div>
      <div className="p-4 space-y-1">
        <h3 className="w-full overflow-hidden whitespace-nowrap text-ellipsis text-md text-gray-700 text-center">
          {product.title}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-2  w-full overflow-hidden whitespace-nowrap text-ellipsis text-sm text-gray-600 text-center">
          {product.description}
        </p>
        <div className="flex mx-4 center justify-center">
          <div className=" flex gap-6">
            <p className="mt-2  center">₹{product.price}</p>
            <p className="text-sm mt-2   text-gray-400 line-through">
              {product.price + (product.price / 100) * 10}
            </p>
            <p className="text-sm mt-2  font-medium text-green-600">10% off</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesProjectCard;
