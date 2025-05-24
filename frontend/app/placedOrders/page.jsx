"use client";
import React, { useState } from "react";
import api from "@/utils/api";
import { useRouter } from "next/navigation";

const PlaceCartOrderPage = () => {
  const [address, setAddress] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleConfirmOrder = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await api.post(
        "/orders/cart",
        { address },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("Orders placed successfully!");
      setTimeout(() => {
        router.push("/orders");
      }, 1000);
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Enter Delivery Address</h2>
      <textarea
        className="w-full border p-3 rounded"
        rows="4"
        placeholder="Enter your shipping address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button
        onClick={handleConfirmOrder}
        className="bg-green-600 text-white px-4 py-2 mt-4 rounded"
      >
        Confirm Order
      </button>
      {success && <p className="text-green-600 mt-4">{success}</p>}
    </div>
  );
};

export default PlaceCartOrderPage;
