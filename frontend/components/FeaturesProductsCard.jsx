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
      className=" w-94.4 bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer "
    >
      <div className="bg-gray-100 flex-1 overflow-hidden">
        <div className="w-full h-60 bg-gray-100 rounded-2xl">
          <img
            src={product.image}
            alt={product.title}
            className="object-contain w-full h-full rounded-3xl p-2"
          />
        </div>
      </div>
      <div className="p-4 space-y-1">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {product.title}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-2">
          {product.description}
        </p>
        <div className="flex">
          <p className="mt-2 text-indigo-600 font-bold text-lg center">
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

export default FeaturesProjectCard;
