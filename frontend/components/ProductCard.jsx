"use client";
import { useRouter } from "next/navigation";
import React from "react";

const ProductCard = ({ product }) => {
  const router = useRouter();

  const handleBuy = (id) => {
    router.push(`/buy/${id}`);
  };

  const handleClick = () => {
    const user = localStorage.getItem("userRole");
    const isAdmin = user === "admin";
    if (isAdmin) {
      router.push(`/dashboard/edit/${product._id}`);
    } else {
      router.push(`/products/product/${product._id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className=" w-60 bg-[#FFFFFF]   overflow-hidden transition-shadow duration-400 cursor-pointer rounded shadow-4xl transition-transform duration-500 hover:scale-[1.04] hover:shadow-2xl gap-2  "
    >
      <div className="w-full h-50">
        <img
          src={product.image}
          alt={product.title}
          className="object-contain w-full h-full rounded-2xl p-2"
        />
      </div>
      <div className="p-4 space-y-1">
        <h3 className=" w-full overflow-hidden whitespace-nowrap text-ellipsis text-sm text-gray-600 text-center">
          {product.title}
        </h3>
        <div className=" flex gap-4 center justify-center">
          <p className="mt-2 text-gray-600 center">₹{product.price}</p>
          <p className="text-sm mt-2   text-gray-400 line-through">
            {product.price + (product.price / 100) * 10}
          </p>
          <p className="text-sm mt-2  font-medium text-green-600">10% off</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
