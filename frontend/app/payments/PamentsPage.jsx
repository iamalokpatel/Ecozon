"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import api from "@/utils/api";
import PaymentOptions from "@/app/buy/components/PaymentOptions";

const PaymentsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const orderId = searchParams.get("orderId");

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handlePayment = async () => {
    if (!orderId) return alert("Order ID not found");

    try {
      await api.post(
        `/orders/${orderId}/pay`,
        { paymentMethod },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess("Payment method selected successfully!");
      setTimeout(() => router.push("/orders"), 1000);
    } catch (err) {
      console.error(err);
      setError("Payment failed!");
    }
  };

  return (
    <div className="min-h-screen max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>
      <PaymentOptions
        selectedMethod={paymentMethod}
        setSelectedMethod={setPaymentMethod}
      />
      <button
        className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded cursor-pointer"
        onClick={handlePayment}
      >
        Confirm Payment
      </button>
      {success && <p className="text-green-600 mt-2">{success}</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default PaymentsPage;
