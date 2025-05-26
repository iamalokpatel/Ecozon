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
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Select Payment Method
      </h2>
      <div className="space-y-3">
        {paymentMethods.map((method) => (
          <div
            key={method.value}
            onClick={() => setSelectedMethod(method.value)}
            className={`flex items-center p-3 rounded-lg cursor-pointer border ${
              selectedMethod === method.value
                ? "border-blue-600 bg-blue-50"
                : "border-gray-300 hover:border-blue-400"
            }`}
          >
            <div className="mr-3">{method.icon}</div>
            <div className="text-sm font-medium text-gray-800">
              {method.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentOptions;
