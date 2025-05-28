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
      className=" w-74 bg-white  rounded-2xl overflow-hidden transition-shadow duration-400 cursor-pointer  shadow-4xl transition-transform duration-500 hover:scale-[1.10] hover:shadow-2xl  "
    >
      <div className="w-full h-50 bg-gray-100">
        <img
          src={product.image}
          alt={product.title}
          className="object-contain w-full h-full rounded-2xl p-2"
        />
      </div>
      <div className="p-4 space-y-1">
        <h3 className="text-sm font-semibold text-gray-800 truncate">
          {product.title}
        </h3>
        <div className="flex">
          <p className="mt-2 text-indigo-400 text-lg center">
            ₹{product.price}
          </p>
          <button
            onClick={() => handleBuy(product._id)}
            className="h-6 max-sm:hidden px-3 text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-50 transition ml-auto center mt-2"
          >
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
