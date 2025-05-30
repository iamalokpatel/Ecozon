"use client";
import api from "@/utils/api";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const checkLogin = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first.");
      router.push("/users/login");
      return;
    }
    return true;
  };

  const handleAddToCart = async (id) => {
    if (!checkLogin()) return;

    try {
      const token = localStorage.getItem("token");
      await api.post(
        "/cart/add",
        { productId: id, quantity: 1 },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const productExists = cart.find((item) => item.productId === id);

      if (!productExists) {
        cart.push({ productId: id, quantity: 1 });
      }

      router.push("/cart");
    } catch (error) {
      if (error.response?.data?.message === "Product already in cart") {
        alert("Product already in cart!");
      } else {
        alert("Something went wrong while adding to cart.");
        console.error("Add to cart error:", error);
      }
    }
  };

  const handleBuy = (id) => {
    if (!checkLogin()) return;
    router.push("/buy?mode=single&productId=" + product._id);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-500 animate-pulse">
          Loading product...
        </p>
      </div>
    );

  if (!product)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-red-600 font-semibold">Product not found!</p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start bg-gradient-to-br from-white via-gray-50 to-gray-100 p-10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-200">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-[26rem] object-contain rounded-[1.5rem] transition-transform duration-500 ease-in-out hover:scale-105 hover:rotate-1"
        />

        <div className="space-y-6 center">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight leading-tight">
            {product.title}
          </h1>

          <h2 className="text-2xl font-medium text-gray-500 italic">
            {product.subtitle}
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed ">
            {product.description}
          </p>

          <div className="text-3xl font-bold text-gray-800 tracking-tight leading-tight">
            ₹{product.price}
          </div>

          <div className="flex flex-wrap gap-4 mt-8">
            <button
              onClick={() => handleAddToCart(product._id)}
              className="px-6 py-3 bg-yellow-500 text-white rounded-full font-bold shadow-lg hover:bg-yellow-600 transition duration-300 hover:scale-105 active:scale-95"
            >
              Add to Cart
            </button>

            <button
              onClick={() => handleBuy(product._id)}
              className="px-8 py-3 bg-green-600 text-white rounded-full font-bold shadow-lg hover:bg-green-700 transition duration-300 hover:scale-105 active:scale-95"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
