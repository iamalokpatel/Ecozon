"use client";

import api from "@/utils/api";
import Image from "next/image";
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
      await api.delete(`/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const res = await api.get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data.items);
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
    <div className="min-h-screen max-w-6xl mx-auto px-4 py-4">
      {cartItems.length === 0 ? (
        <div className="w-full h-110 flex flex-col bg-white  items-center justify-center text-center gap-3">
          <Image
            src="/images/cart.webp"
            alt="Empty Cart"
            height={200}
            width={240}
            className="object-contain bg-transparent border-0 outline-none"
          />

          <p className="text-lg">Your cart is empty!</p>
          <span className="text-xs mb-2">Add items to it now.</span>
          <button
            onClick={() => router.push("/products")}
            className="bg-[rgb(40,116,240)] text-white text-sm px-18 py-3 rounded-[2px]  transition cursor-pointer mt-5 font-normal shadow-[0_2px_4px_0_rgba(0,0,0,0.2)] border-0"
          >
            Shop now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 bg-white shadow-[0_0_4px_0_rgba(0,0,0,0.1)] transition-shadow">
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

            {/* Button wrapper aligned right */}
            <div className="flex justify-end">
              <button
                onClick={handleGoToPlaceCartOrder}
                className=" mb-4 mr-4 w-auto px-16 bg-orange-500 text-white font-sans py-[10px] rounded-sm hover:bg-orange-600 transition font-semibold text-base shadow-md transition duration-300 tracking-wide uppercase cursor-pointer"
              >
                PLACE ORDER
              </button>
            </div>
          </div>

          {/* Right: Summary */}
          <div className="bg-white rounded shadow-md p-6 h-fit sticky top-23">
            <CartSummary items={cartItems} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
