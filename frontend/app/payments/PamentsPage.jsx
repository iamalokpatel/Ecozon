"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const token = typeof window !== "undefined" && localStorage.getItem("token");

  const [productsToOrder, setProductsToOrder] = useState([]);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const items = JSON.parse(sessionStorage.getItem("checkoutItems") || "[]");
      const addr = JSON.parse(
        sessionStorage.getItem("checkoutAddress") || "{}"
      );
      setProductsToOrder(items);
      setAddress(addr);
    }
  }, []);

  const getTotalPrice = () =>
    productsToOrder.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );

  const handlePayment = async () => {
    try {
      const payload = {
        items: productsToOrder,
        address,
        paymentMethod,
        totalPrice: getTotalPrice(),
      };

      if (paymentMethod === "cod") {
        // ✅ COD → direct order create
        await api.post("/orders/create", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("COD Order Placed!");
        router.push("/orders");
      } else {
        // ✅ Razorpay flow
        const res = await api.post("/orders/create", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { razorpayOrder, key } = res.data;

        const options = {
          key,
          amount: razorpayOrder.amount,
          currency: "INR",
          name: "MyShop",
          description: "Order Payment",
          order_id: razorpayOrder.id,
          handler: async function (response) {
            await api.post(
              "/orders/verify",
              {
                ...response,
                items: productsToOrder,
                address,
                totalPrice: getTotalPrice(),
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("Payment successful!");
            router.push("/orders");
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (err) {
      console.error(err);
      alert("Payment failed!");
    }
  };

  return (
    <div className="min-h-screen max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>
      <div className="rounded shadow-xl">
        {paymentMethods.map((method) => (
          <div
            key={method.value}
            onClick={() => setPaymentMethod(method.value)}
            className={`flex items-center p-4 cursor-pointer border-b transition-all ${
              paymentMethod === method.value
                ? "border-green-500 bg-green-50"
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
        className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded"
        onClick={handlePayment}
      >
        Confirm Payment & Create Order
      </button>
    </div>
  );
};

export default PaymentsPage;
