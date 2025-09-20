"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";

const PaymentsPage = () => {
  const router = useRouter();
  const token = typeof window !== "undefined" && localStorage.getItem("token");

  const [productsToOrder, setProductsToOrder] = useState([]);
  const [address, setAddress] = useState({});
  const [isVerifying, setIsVerifying] = useState(false);

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

  const handleOnlinePayment = async () => {
    try {
      const payload = {
        items: productsToOrder,
        address,
        paymentMethod: "online",
        totalPrice: getTotalPrice(),
      };

      /////////  Create Razorpay order   //////////

      const res = await api.post("/orders/create", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { razorpayOrder, key } = res.data;

      const options = {
        key,
        amount: razorpayOrder.amount,
        currency: "INR",
        name: "Ecozon",
        description: "Order Payment",
        order_id: razorpayOrder.id,
        prefill: {
          name: address.name || "Customer",
          email: address.email || "",
          contact: address.phone || "",
        },
        theme: { color: "#f1f3f6" },
        notes: { address: JSON.stringify(address) },

        /////////   After successful payment  /////////////
        handler: async function (response) {
          try {
            setIsVerifying(true);
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
            router.push("/orders");
          } catch (err) {
            console.error(err);
            alert("Verification failed!");
            router.push("/");
          } finally {
            setIsVerifying(false);
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed!");
      router.push("/");
    }
  };

  useEffect(() => {
    if (productsToOrder.length > 0 && address) {
      handleOnlinePayment();
    }
  }, [productsToOrder, address]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {isVerifying ? (
        <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center space-y-4 animate-fadeIn">
          <div className="relative flex">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-500 animate-pulse"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 11c0-1.104-.896-2-2-2H7V7h3c2.209 0 4 1.791 4 4v6h-2v-6z"
                />
              </svg>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-gray-800">
            Verifying Your Payment
          </h2>
          <p className="text-gray-600 text-center text-sm leading-relaxed max-w-sm">
            We’re confirming your transaction with the payment gateway. This may
            take a few seconds. Please don’t refresh or close this page.
          </p>
          <div className="flex space-x-2 mt-2">
            <span className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"></span>
            <span className="h-2 w-2 bg-blue-400 rounded-full animate-bounce delay-150"></span>
            <span className="h-2 w-2 bg-blue-300 rounded-full animate-bounce delay-300"></span>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">Redirecting to payment gateway...</p>
      )}
    </div>
  );
};

export default PaymentsPage;
