"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import api from "@/utils/api";
import OrderSummary from "@/app/buy/components/OrderSummary";
import PriceDetails from "@/app/buy/components/PriceDetails";
import PaymentOptions from "@/app/buy/components/PaymentOptions";
import LoginPage from "./components/LoginPage";

const BuyPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const mode = searchParams.get("mode");
  const productId = searchParams.get("productId");

  const [product, setProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const token = typeof window !== "undefined" && localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setError("User not authenticated");
      return;
    }

    if (mode === "single" && productId) {
      api
        .get(`/products/${productId}`)
        .then((res) => setProduct(res.data))
        .catch(() => setError("Failed to fetch product"));
    } else if (mode === "cart") {
      api
        .get("/cart", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setCartItems(res.data.items))
        .catch(() => setError("Failed to fetch cart items"));
    }
  }, [mode, productId]);

  const handleConfirmOrder = async () => {
    if (!address) return alert("Please enter your address");

    try {
      const payload = {
        address,
        paymentMethod,
      };

      if (mode === "single" && productId) {
        payload.productId = productId;
        await api.post("/orders", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else if (mode === "cart") {
        await api.post("/orders/cart", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setSuccess("Order placed successfully!");
      setTimeout(() => router.push("/orders"), 1200);
    } catch (err) {
      console.error("Order error:", err);
      alert("Something went wrong!");
    }
  };

  const preparedProducts =
    mode === "single" && product
      ? [{ price: product.price, quantity: 1, name: product.title }]
      : cartItems.map((item) => ({
          price: item.product.price,
          quantity: item.quantity,
          name: item.product.title,
        }));

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {mode === "single"
            ? `Buy ${product?.title || ""}`
            : "Buy All Cart Items"}
        </h2>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <LoginPage />

        {/* Address Input */}
        <textarea
          className="w-full border border-gray-300 p-2 rounded mt-6"
          placeholder="Enter your shipping address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        {/* Order Summary */}
        {preparedProducts && <OrderSummary products={preparedProducts} />}

        {/* Payment Options */}
        <PaymentOptions
          selectedOption={paymentMethod}
          setSelectedOption={setPaymentMethod}
        />

        {/* Confirm Button */}
        <button
          onClick={handleConfirmOrder}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 mt-4 rounded-lg transition"
        >
          Confirm Order
        </button>

        {success && (
          <p className="text-green-600 mt-4 font-medium">{success}</p>
        )}
      </div>

      {/* Price Summary */}
      <div className="sticky top-6 h-fit">
        <PriceDetails products={preparedProducts} />
      </div>
    </div>
  );
};

export default BuyPage;
