"use client";

import api from "@/utils/api";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import CartItem from "@/components/CartItem";
import CartSummary from "@/components/CartSummary";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const hasCheckedRef = useRef(false);
  const router = useRouter();

  const handleRemove = async (productId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await api.delete(`/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data.cart.items);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleQuantityChange = async (productId, action) => {
    const token = localStorage.getItem("token");

    try {
      const res = await api.post(
        "/cart/update",
        { productId, action },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCartItems(res.data.cart.items);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleGoToPlaceCartOrder = async () => {
    if (cartItems.length === 0) {
      alert("Add a product to the cart before placing an order.");
      return;
    }
    router.push("/buy?mode=cart");
  };

  useEffect(() => {
    if (hasCheckedRef.current) return;
    hasCheckedRef.current = true;

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");

    if (!token) {
      alert("Please login to access the Cart");
      router.push("/users/login");
      return;
    }

    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      const res = await api.get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data.items);
    };
    fetchCart();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-xl font-bold mb-8 text-center text-gray-500">
        Your Shopping Cart
      </h2>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center">
          <img
            src="/images/empty-cart.png"
            alt="Empty Cart"
            className="w-60 h-30 opacity-80 mb-6"
          />

          <p className="text-sm text-gray-600 mb-4 ">
            Your Cart is Currently Empty
          </p>
          <button
            onClick={() => router.push("/products")}
            className="bg-blue-600 text-white px-12 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Shop Products
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                onRemove={handleRemove}
                onIncrease={() =>
                  handleQuantityChange(item.product._id, "increase")
                }
                onDecrease={() =>
                  handleQuantityChange(item.product._id, "decrease")
                }
              />
            ))}
            <CartSummary items={cartItems} />
          </div>

          <button
            onClick={handleGoToPlaceCartOrder}
            className="bg-orange-500 text-white text-lg font-semibold w-full py-4 rounded-lg hover:bg-orange-600 transition duration-300"
          >
            🛍️ Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
