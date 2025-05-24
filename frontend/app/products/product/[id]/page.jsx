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

  const handleAddToCart = async (id) => {
    const token = localStorage.getItem("token");
    try {
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
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start bg-white p-8 rounded-3xl shadow-2xl">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-96 object-cover rounded-2xl transition-transform duration-300 hover:scale-105"
        />

        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">{product.title}</h1>
          <h2 className="text-xl font-medium text-gray-500">
            {product.subtitle}
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            {product.description}
          </p>

          <div className="text-3xl font-bold text-green-600">
            ${product.price}
          </div>

          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={() => handleAddToCart(product._id)}
              className="px-6 py-3 bg-yellow-500 text-white rounded-full font-semibold hover:bg-yellow-600 transition duration-300"
            >
              Add to Cart
            </button>

            <button
              onClick={() => handleBuy(product._id)}
              className="px-6 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition duration-300"
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
