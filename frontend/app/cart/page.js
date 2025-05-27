"use client";

import api from "@/utils/api";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import CartItem from "@/components/CartItem";
import CartSummary from "@/components/CartSummary";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const hasCheckedRef = useRef(false);
  const [accessMessage, setAccessMessage] = useState("");
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
      setAccessMessage("Only users can access this page.");
      setTimeout(() => {
        router.push("/users/login");
      }, 2000);
      return;
    }

    if (role !== "user") {
      setAccessMessage("Only users can access this page.");
      setTimeout(() => {
        router.back(); // Redirect to previous page after 3 seconds
      }, 2000);
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

  if (accessMessage) {
    return (
      <div className="max-w-3xl mx-auto mt-8 p-8 shadow-[0_10px_25px_rgba(0,0,0,0.25)]  text-center text-red-600 font-semibold text-lg">
        {accessMessage}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-10 text-gray-700 text-center">
        Your Shopping Cart
      </h2>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center">
          <img
            src="/images/empty-cart.png"
            alt="Empty Cart"
            className="w-60 h-30 opacity-80 mb-6"
          />

          <p className="text-md text-gray-600 mb-4">
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Cart Items */}
          <div className="lg:col-span-2 space-y-4">
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
            <button
              onClick={handleGoToPlaceCartOrder}
              className="mt-6 w-full bg-orange-500 text-white text-lg font-semibold py-3 rounded-lg hover:bg-orange-600 transition duration-300"
            >
              🛍️ Place Order
            </button>
          </div>

          {/* Right: Summary */}
          <div className="bg-white border rounded-xl shadow-md p-6 h-fit sticky top-20">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Price Summary
            </h3>
            <CartSummary items={cartItems} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
