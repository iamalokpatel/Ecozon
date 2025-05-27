"use client";

import React from "react";
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

const PaymentOptions = ({ selectedMethod, setSelectedMethod }) => {
  return (
    <div className="rounded-2xl p-6 bg-white shadow-xl border border-gray-200">
      <h2 className="text-xl font-bold mb-5 text-gray-900">
        Select Payment Method
      </h2>
      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div
            key={method.value}
            onClick={() => setSelectedMethod(method.value)}
            className={`flex items-center p-4 rounded-2xl cursor-pointer transition-all duration-200 shadow-sm border-2 group
          ${
            selectedMethod === method.value
              ? "border-green-500 bg-green-50 ring-2 ring-green-400/40"
              : "border-gray-300 hover:border-blue-400 hover:shadow-md"
          }`}
          >
            <div className="mr-4 text-xl text-blue-600 group-hover:scale-110 transition-transform">
              {method.icon}
            </div>
            <div className="text-base font-medium text-gray-800">
              {method.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentOptions;
