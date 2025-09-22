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
  const [hasPaid, setHasPaid] = useState(false);

  //////////  Countdown + Progress  //////////
  const [count, setCount] = useState(5);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVerifying && !hasPaid && count > 0) {
      const timer = setTimeout(() => {
        setCount((prev) => prev - 1);
        setProgress((prev) => prev + 20);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (!isVerifying && !hasPaid && count === 0) {
      handleOnlinePayment();
    }
  }, [count, isVerifying, hasPaid]);

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

            setHasPaid(true);
            sessionStorage.removeItem("checkoutItems");
            sessionStorage.removeItem("checkoutAddress");
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
    if (productsToOrder.length > 0 && Object.keys(address).length > 0) {
      setCount(5);
      setProgress(0);
    }
  }, [productsToOrder, address]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {isVerifying ? (
        /////////   Verification UI  /////////////
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
        /////////   Redirecting UI  /////////////
        <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl px-8 py-10 w-[400px] flex flex-col items-center space-y-8 animate-fadeIn">
          {/* Brand Header */}

          <div className="flex flex-col items-center space-y-1">
            {/* <img src="/logo.png" alt="Ecozon Logo" className="w-14 h-14" /> */}
            <h1 className="text-xl font-bold text-gray-800">Ecozon</h1>
            <p className="text-gray-500 text-sm">
              Sustainable shopping, simplified
            </p>
          </div>

          <div className="flex items-center justify-between w-full text-xs text-gray-500">
            <span className="font-medium text-green-600">Cart</span>
            <span>→</span>
            <span className="font-medium text-green-600">Address</span>
            <span>→</span>
            <span className="font-medium text-blue-600">Payment</span>
            <span>→</span>
            <span>Success</span>
          </div>

          {/*/////////   Circular Progress with Countdown  ///////////// */}
          <div className="relative">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="42"
                stroke="#e5e7eb"
                strokeWidth="6"
                fill="transparent"
              />
              <circle
                cx="48"
                cy="48"
                r="42"
                stroke="#3b82f6"
                strokeWidth="6"
                strokeDasharray={260}
                strokeDashoffset={260 - (progress / 100) * 260}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-500"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-gray-700">
              {count}s
            </span>
          </div>

          {/* Title */}
          <h2 className="text-lg font-semibold text-gray-800">
            Redirecting to Payment Gateway
          </h2>
          <p className="text-gray-600 text-center text-sm leading-relaxed">
            We’re securely connecting you to Razorpay. <br />
            Please don’t refresh or close this window. <br />
            You’ll be able to complete your payment on the next screen.
          </p>

          {/* Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={() => handleOnlinePayment()}
              className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg shadow hover:bg-blue-600 transition"
              disabled={hasPaid}
            >
              Retry Now
            </button>
            <button
              onClick={() => router.push("/")}
              className="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg shadow hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>

          {/* Security Badges */}
          <div className="flex flex-col items-center space-y-2 text-xs text-gray-500 mt-2">
            <div className="flex space-x-2">
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full">
                🔒 SSL Secured
              </span>
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full">
                ✅ PCI-DSS Compliant
              </span>
            </div>
            <p>Secured by Razorpay • 256-bit Encryption</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentsPage;
