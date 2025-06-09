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
    <div className="rounded shadow-xl">
      <div className="">
        {paymentMethods.map((method) => (
          <div
            key={method.value}
            onClick={() => setSelectedMethod(method.value)}
            className={`flex items-center p-4  cursor-pointer border-b border-gray-50 transition-all ${
              selectedMethod === method.value
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
    </div>
  );
};

export default PaymentOptions;
