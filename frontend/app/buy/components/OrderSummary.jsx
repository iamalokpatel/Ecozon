"use client";

import React, { useEffect, useState } from "react";
import api from "@/utils/api";

const OrderSummary = ({ mode, productId }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        setError("");
        const token = localStorage.getItem("token");
        const res = await api.get("/orders/summary", {
          headers: { Authorization: `Bearer ${token}` },
          params: { mode, productId },
        });

        setItems(res.data);
      } catch (err) {
        setError("Failed to load order summary");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [mode, productId]);

  // Calculate totals
  const subTotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shippingCharge = subTotal > 1000 ? 0 : 50; // example logic
  const discount = 0; // you can later add coupon discount here
  const total = subTotal + shippingCharge - discount;

  if (loading) return <p>Loading summary...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

      <ul className="divide-y divide-gray-200 mb-4">
        {items.map((item, i) => (
          <li key={i} className="py-2 flex justify-between">
            <span>
              {item.name || "Product"} × {item.quantity}
            </span>
            <span>₹{item.price * item.quantity}</span>
          </li>
        ))}
      </ul>

      <div className="border-t border-gray-300 pt-4 space-y-2">
        <span>2</span>
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subTotal}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>₹{shippingCharge}</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
