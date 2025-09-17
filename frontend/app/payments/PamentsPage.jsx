"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import api from "@/utils/api";
import { CreditCard, Banknote, Wallet, IndianRupee } from "lucide-react";

const paymentMethods = [
  { label: "UPI", value: "upi", icon: <IndianRupee className="h-5 w-5" /> },
  {
    label: "Credit/Debit Card",
    value: "card",
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    label: "Net Banking",
    value: "netbanking",
    icon: <Banknote className="h-5 w-5" />,
  },
  {
    label: "Cash on Delivery",
    value: "cod",
    icon: <Wallet className="h-5 w-5" />,
  },
];

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

      {/* Inline Payment Options */}
      <div className="rounded shadow-xl">
        {paymentMethods.map((method) => (
          <div
            key={method.value}
            onClick={() => setPaymentMethod(method.value)}
            className={`flex items-center p-4 cursor-pointer border-b transition-all ${
              paymentMethod === method.value
                ? "border-green-500 bg-green-50 ring-0.5 ring-green-400/40"
                : "border-gray-300 hover:border-blue-400 hover:shadow-md"
            }`}
          >
            <div className="mr-4 text-blue-600">{method.icon}</div>
            <div className="text-base font-medium text-gray-800">
              {method.label}
            </div>
          </div>
        ))}
      </div>

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
