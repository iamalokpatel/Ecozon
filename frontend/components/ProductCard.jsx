"use client";
import Image from "next/image";
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
      className=" w-60 bg-[#FFFFFF] p-4 flex flex-col gap-2 overflow-hidden transition-shadow duration-400 cursor-pointer rounded shadow-4xl transition-transform duration-500 hover:scale-[1.04] hover:shadow-2xl gap-2  "
    >
      <div className="w-full h-50 overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className="object-cover w-full h-full rounded"
        />
      </div>
      <div className="">
        <h3 className=" w-full truncate text-sm text-gray-600 text-center">
          {product.title}
        </h3>
      </div>

      <div className=" flex flex-row gap-2 items-center justify-center">
        <p className="inline-block text-base font-medium text-gray-900">
          ₹{product.price}
        </p>
        <p className="text-sm text-gray-600 line-through">
          {parseInt((10 * product.price) / 9)}
        </p>
        <p className="text-sm text-green-700 tracking-tight font-medium">
          10% off
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
